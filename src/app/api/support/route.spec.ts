import { GET } from './route';
import supabase from '@/database/supabaseClient';

jest.mock('@/database/supabaseClient', () => ({
  __esModule: true,
  default: {
    from: jest.fn()
  }
}));

describe('GET /api/support API route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    test('should return support data successfully', async () => {
      const fakeData = [
        { id: 1, support_img: 'img1.png', support_color: 'Red', support_tags: ['Attacker'] },
        { id: 2, support_img: 'img2.png', support_color: 'Blue', support_tags: ['Defender'] },
      ];
      const selectMock = jest.fn().mockResolvedValue({ data: fakeData, error: null });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const response = await GET();
      const json = await response.json();

      expect(selectMock).toHaveBeenCalledWith('*');
      expect(json).toEqual({
        success: true,
        message: "Support fetched successfully",
        data: fakeData
      });
    });
  });

  describe('Unhappy Paths', () => {
    test('should return an error when Supabase returns an error', async () => {
      const fakeError = { message: 'Database error' };
      const selectMock = jest.fn().mockResolvedValue({ data: null, error: fakeError });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const response = await GET();
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json).toEqual({
        success: false,
        message: "Failed to fetch Support from database",
        error: `Supabase error: ${fakeError.message}`
      });
    });

    test('should return an error when an exception is thrown', async () => {
      const selectMock = jest.fn().mockRejectedValue(new Error('Unexpected error'));
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const response = await GET();
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json).toEqual({
        success: false,
        message: "Failed to fetch Support from database",
        error: "Unexpected error"
      });
    });
  });
});