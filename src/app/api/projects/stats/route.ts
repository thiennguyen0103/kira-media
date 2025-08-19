import { NextRequest, NextResponse } from 'next/server';
import { ProjectAPI } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organization_id') || undefined;

    // Fetch project statistics from database
    const stats = await ProjectAPI.getProjectStats(organizationId);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching project stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project statistics' },
      { status: 500 }
    );
  }
}
