import { NextResponse } from 'next/server';
import supabase from '@/database/supabaseClient';

export async function GET() {
  try {
    console.log('Fetching Support from Supabase...');
    const { data, error } = await supabase.from('support').select('*');
    if (error) {
      console.error('Supabase error:', error.message);
      throw new Error(`Supabase error: ${error.message}`);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Support fetched successfully',
      data: data || []
    });
    
  } catch (error) {
    console.error('Error in Support API route:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch Support from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
