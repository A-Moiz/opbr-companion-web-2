import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = 'https://bwpgdqzcvqroakybcgjd.supabase.co';
const SUPABASE_ANON_KEY: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cGdkcXpjdnFyb2FreWJjZ2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODY4MTgsImV4cCI6MjA1Njk2MjgxOH0.sqsWDAJ9CduUF9RHUHeEy9yv4ByJceAzhG54y-DRb8I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
