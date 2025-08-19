import { NextRequest, NextResponse } from 'next/server';
import { ProjectAPI } from '@/lib/api';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // For demo purposes, using a hardcoded user ID
    // In a real app, this would come from authentication
    const userId = '5bff2d00-9cff-49f0-9288-bcdddce607ef'; // Using the test user ID from seed

    const result = await ProjectAPI.toggleFavorite(id, userId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Failed to toggle favorite' },
      { status: 500 }
    );
  }
}
