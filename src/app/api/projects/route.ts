import { NextRequest, NextResponse } from 'next/server';
import { ProjectAPI } from '@/lib/api';
import type { ProjectFilters } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const created_by = searchParams.get('created_by') || undefined;
    const difficulty_level = searchParams.get('difficulty_level') || undefined;
    const sort_by = searchParams.get('sort_by') || undefined;
    const sort_order = searchParams.get('sort_order') || undefined;
    const userId = searchParams.get('userId') || undefined;

    // Build filters object
    const filters: ProjectFilters = {
      search,
      status,
      created_by,
      difficulty_level,
      sort_by: sort_by as ProjectFilters['sort_by'],
      sort_order: sort_order as ProjectFilters['sort_order'],
    };

    // Fetch projects from database
    const result = await ProjectAPI.getProjects(filters, page, limit, userId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.created_by) {
      return NextResponse.json(
        { error: 'Name and created_by are required' },
        { status: 400 }
      );
    }

    // Create project
    const project = await ProjectAPI.createProject({
      ...body,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
      status: body.status || 'draft',
      duration_seconds: body.duration_seconds || 0,
      tags: body.tags || [],
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
