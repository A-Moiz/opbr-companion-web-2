import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Response from external API:', data);
    return NextResponse.json({
      success: true,
      message: 'API called successfully. Check server logs for details.',
      data
    });
  } catch (error) {
    console.error('Error calling external API:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch data from external API',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
