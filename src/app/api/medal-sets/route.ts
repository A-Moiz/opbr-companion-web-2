import { NextResponse } from 'next/server';
import { supabase } from '@/database/supabaseClient';

export async function GET() {
  try {
    console.log('Fetching medal sets from Supabase...');
    const { data, error } = await supabase.from('medal_set').select('*');
    if (error) {
      console.error('Supabase error:', error.message);
      throw new Error(`Supabase error: ${error.message}`);
    }
    return NextResponse.json({
      success: true,
      message: 'Medal sets fetched successfully',
      data: data || []
    });
  } catch (error) {
    console.error('Error in medal-sets API route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch medal sets from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
