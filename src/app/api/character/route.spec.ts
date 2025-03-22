import { GET } from './route';
import supabase from '@/database/supabaseClient';

jest.mock('@/database/supabaseClient', () => ({
  __esModule: true,
  default: {
    from: jest.fn()
  }
}));

describe('GET /character API route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    test('should return character data successfully', async () => {
      const fakeData = [
        { id: 1, name: 'Luffy', class: 'Attacker' },
        { id: 2, name: 'Zoro', class: 'Defender' }
      ];
      const selectMock = jest.fn().mockResolvedValue({ data: fakeData, error: null });
      (supabase.from as jest.Mock).mockReturnValue({ select: selectMock });

      const response = await GET();
      const json = await response.json();

      expect(selectMock).toHaveBeenCalledWith('*');
      expect(json).toEqual({
        success: true,
        message: 'Character data fetched successfully',
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
        message: 'Failed to fetch character data from database',
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
        message: 'Failed to fetch character data from database',
        error: 'Unexpected error'
      });
    });
  });
});