import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');

    // Test database connection
    const client = await pool.connect();
    console.log('Database client connected successfully');

    try {
      // Simple query to test connection
      console.log('Executing test query...');
      const result = await client.query('SELECT NOW() as current_time');
      console.log('Query executed successfully:', result.rows[0]);

      return NextResponse.json({
        status: 'success',
        message: 'Database connection successful',
        timestamp: result.rows[0].current_time,
        database: 'PostgreSQL',
        version: 'Connected',
        config: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || '5432',
          database: process.env.DB_NAME || 'kira_media',
          user: process.env.DB_USER || 'kira_user',
        },
      });
    } finally {
      console.log('Releasing database client...');
      client.release();
    }
  } catch (error) {
    console.error('Database connection test failed:', error);

    // Provide more detailed error information
    let errorMessage = 'Unknown error';
    let errorCode = 'UNKNOWN';

    if (error instanceof Error) {
      errorMessage = error.message;
      // Check for specific PostgreSQL error codes
      if (error.message.includes('ECONNREFUSED')) {
        errorCode = 'CONNECTION_REFUSED';
      } else if (error.message.includes('ENOTFOUND')) {
        errorCode = 'HOST_NOT_FOUND';
      } else if (error.message.includes('timeout')) {
        errorCode = 'CONNECTION_TIMEOUT';
      } else if (error.message.includes('password authentication failed')) {
        errorCode = 'AUTH_FAILED';
      } else if (
        error.message.includes('database "kira_media" does not exist')
      ) {
        errorCode = 'DATABASE_NOT_FOUND';
      }
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: errorMessage,
        errorCode: errorCode,
        details: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || '5432',
          database: process.env.DB_NAME || 'kira_media',
          user: process.env.DB_USER || 'kira_user',
        },
      },
      { status: 500 }
    );
  }
}
