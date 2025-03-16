describe('Supabase Client', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('Happy Paths', () => {
    test('should create a Supabase client when environment variables are provided', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_DOMAIN = 'test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test_anon_key';
      const createClientMock = jest.fn().mockReturnValue({ some: 'client' });
      jest.doMock('@supabase/supabase-js', () => ({
        createClient: createClientMock
      }));
      const { default: supabase } = await import('@/database/supabaseClient');
      expect(createClientMock).toHaveBeenCalledWith('https://test.supabase.co', 'test_anon_key');
      expect(supabase).toEqual({ some: 'client' });
    });
  });

  describe('Unhappy Paths', () => {
    test('should throw an error if NEXT_PUBLIC_SUPABASE_DOMAIN is missing', async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_DOMAIN;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test_anon_key';
      await expect(import('@/database/supabaseClient')).rejects.toThrow(/Missing NEXT_PUBLIC_SUPABASE_DOMAIN/);
    });

    test('should throw an error if NEXT_PUBLIC_SUPABASE_ANON_KEY is missing', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_DOMAIN = 'test.supabase.co';
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      await expect(import('@/database/supabaseClient')).rejects.toThrow(/Missing NEXT_PUBLIC_SUPABASE_ANON_KEY/);
    });
  });
});
