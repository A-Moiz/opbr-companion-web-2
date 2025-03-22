import { NextResponse } from 'next/server';
import supabase from '@/database/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase.from('character').select('*');
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    return NextResponse.json({
      success: true,
      message: 'Character data fetched successfully',
      data: data || []
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch character data from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}