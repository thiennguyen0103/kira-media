import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST() {
  try {
    const client = await pool.connect();

    try {
      // Check if data already exists
      const checkResult = await client.query('SELECT COUNT(*) FROM projects');
      if (parseInt(checkResult.rows[0].count) > 0) {
        return NextResponse.json({
          message: 'Database already has data',
          count: parseInt(checkResult.rows[0].count),
        });
      }

      // Insert sample user with required fields
      const userResult = await client.query(
        `
        INSERT INTO users (
          username, email, password_hash, first_name, last_name, 
          display_name, role, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
        ) RETURNING id
      `,
        [
          'testuser',
          'test@example.com',
          'dummy-hash-for-testing', // Dummy password hash for testing
          'Test',
          'User',
          'Test User',
          'editor', // Using 'editor' role which exists in the database
        ]
      );

      const userId = userResult.rows[0].id;

      // Insert sample projects with only the fields that exist in the schema
      const projects = [
        {
          name: 'Sample Video Project 1',
          slug: 'sample-video-project-1',
          description: 'A sample video editing project for testing',
          status: 'draft',
          duration_seconds: 120,
          resolution_width: 1920,
          resolution_height: 1080,
          frame_rate: 30,
          difficulty_level: 'beginner',
          tags: ['sample', 'test', 'video'],
          created_by: userId,
        },
        {
          name: 'Sample Video Project 2',
          slug: 'sample-video-project-2',
          description: 'Another sample project for testing',
          status: 'completed', // Changed from 'published' to 'completed'
          duration_seconds: 180,
          resolution_width: 1280,
          resolution_height: 720,
          frame_rate: 24,
          difficulty_level: 'intermediate',
          tags: ['sample', 'test', 'completed'],
          created_by: userId,
        },
      ];

      for (const project of projects) {
        await client.query(
          `
          INSERT INTO projects (
            id, name, slug, description, status, duration_seconds,
            resolution_width, resolution_height, frame_rate,
            difficulty_level, tags, created_by, created_at, updated_at
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
            NOW(), NOW()
          )
        `,
          [
            project.name,
            project.slug,
            project.description,
            project.status,
            project.duration_seconds,
            project.resolution_width,
            project.resolution_height,
            project.frame_rate,
            project.difficulty_level,
            project.tags,
            project.created_by,
          ]
        );
      }

      return NextResponse.json({
        message: 'Sample data inserted successfully',
        userCreated: true,
        projectsCreated: projects.length,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      {
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
