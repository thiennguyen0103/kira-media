import pool from './db';
import type { Project } from './types/project';

// Re-export types for backward compatibility
export type { Project } from './types/project';

export interface ProjectFilters {
  search?: string;
  status?: string;
  created_by?: string;
  tags?: string[];
  difficulty_level?: string;
  organization_id?: string;
  date_range?: {
    start: string;
    end: string;
  };
  sort_by?: 'name' | 'created_at' | 'updated_at' | 'duration_seconds';
  sort_order?: 'asc' | 'desc';
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ProjectStats {
  total: number;
  draft: number;
  in_progress: number;
  review: number;
  approved: number;
  published: number;
  archived: number;
  total_duration: number;
  total_views: number;
  total_likes: number;
}

export class ProjectAPI {
  static async getProjects(
    filters: ProjectFilters = {},
    page = 1,
    limit = 10,
    userId?: string
  ): Promise<ProjectListResponse> {
    const client = await pool.connect();

    try {
      const whereConditions: string[] = ['p.deleted_at IS NULL'];
      const queryParams: (string | number | boolean | string[])[] = [];
      let paramIndex = 1;

      // Build WHERE clause based on filters
      if (filters.search) {
        whereConditions.push(`(
          p.name ILIKE $${paramIndex} OR 
          p.description ILIKE $${paramIndex} OR 
          p.slug ILIKE $${paramIndex}
        )`);
        queryParams.push(`%${filters.search}%`);
        paramIndex++;
      }

      if (filters.status && filters.status !== 'all') {
        whereConditions.push(`p.status = $${paramIndex}`);
        queryParams.push(filters.status);
        paramIndex++;
      }

      if (filters.created_by) {
        whereConditions.push(`p.created_by = $${paramIndex}`);
        queryParams.push(filters.created_by);
        paramIndex++;
      }

      if (filters.organization_id) {
        whereConditions.push(`p.organization_id = $${paramIndex}`);
        queryParams.push(filters.organization_id);
        paramIndex++;
      }

      if (filters.difficulty_level) {
        whereConditions.push(`p.difficulty_level = $${paramIndex}`);
        queryParams.push(filters.difficulty_level);
        paramIndex++;
      }

      if (filters.tags && filters.tags.length > 0) {
        whereConditions.push(`p.tags && $${paramIndex}`);
        queryParams.push(filters.tags);
        paramIndex++;
      }

      if (filters.date_range) {
        whereConditions.push(
          `p.created_at BETWEEN $${paramIndex} AND $${paramIndex + 1}`
        );
        queryParams.push(filters.date_range.start, filters.date_range.end);
        paramIndex += 2;
      }

      // Build ORDER BY clause
      let orderBy = 'p.created_at DESC';
      if (filters.sort_by) {
        const sortField =
          filters.sort_by === 'duration_seconds'
            ? 'p.duration_seconds'
            : filters.sort_by === 'name'
              ? 'p.name'
              : filters.sort_by === 'created_at'
                ? 'p.created_at'
                : filters.sort_by === 'updated_at'
                  ? 'p.updated_at'
                  : 'p.created_at'; // Default fallback

        orderBy = `${sortField} ${filters.sort_order === 'asc' ? 'ASC' : 'DESC'}`;
      }

      // Build the main query
      const whereClause =
        whereConditions.length > 0
          ? `WHERE ${whereConditions.join(' AND ')}`
          : '';

      const countQuery = `
        SELECT COUNT(*) as total
        FROM projects p
        ${whereClause}
      `;

      let projectsQuery: string;

      if (userId) {
        projectsQuery = `
          SELECT 
            p.id,
            p.name,
            p.slug,
            p.description,
            p.status,
            p.duration_seconds,
            p.resolution_width,
            p.resolution_height,
            p.frame_rate,
            p.difficulty_level,
            p.estimated_hours,
            p.tags,
            p.thumbnail_url,
            p.created_by,
            u.display_name as author_name,
            u.username as author_username,
            p.created_at,
            p.updated_at,
            p.deleted_at,
            p.organization_id,
            CASE WHEN pl.project_id IS NOT NULL THEN true ELSE false END as is_favorite
          FROM projects p
          LEFT JOIN users u ON p.created_by = u.id
          LEFT JOIN project_likes pl ON p.id = pl.project_id AND pl.user_id = $${paramIndex + 1}
          ${whereClause}
          ORDER BY ${orderBy}
          LIMIT $2::integer OFFSET $3::integer
        `;
      } else {
        projectsQuery = `
          SELECT 
            p.id,
            p.name,
            p.slug,
            p.description,
            p.status,
            p.duration_seconds,
            p.resolution_width,
            p.resolution_height,
            p.frame_rate,
            p.difficulty_level,
            p.estimated_hours,
            p.tags,
            p.thumbnail_url,
            p.created_by,
            u.display_name as author_name,
            u.username as author_username,
            p.created_at,
            p.updated_at,
            p.deleted_at,
            p.organization_id,
            false as is_favorite
          FROM projects p
          LEFT JOIN users u ON p.created_by = u.id
          ${whereClause}
          ORDER BY ${orderBy}
          LIMIT $1::integer OFFSET $2::integer
        `;
      }

      // Execute count query
      const countResult = await client.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);

      // Execute projects query with pagination
      if (userId) {
        queryParams.push(userId, limit, (page - 1) * limit);
      } else {
        queryParams.push(limit, (page - 1) * limit);
      }

      try {
        const projectsResult = await client.query(projectsQuery, queryParams);

        // Transform the results to match our interface
        const projects: Project[] = projectsResult.rows.map((row) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          description: row.description,
          status: row.status,
          duration_seconds: parseFloat(row.duration_seconds) || 0,
          resolution_width: row.resolution_width,
          resolution_height: row.resolution_height,
          frame_rate: row.frame_rate ? parseFloat(row.frame_rate) : undefined,
          difficulty_level: row.difficulty_level,
          estimated_hours: row.estimated_hours
            ? parseFloat(row.estimated_hours)
            : undefined,
          tags: row.tags || [],
          thumbnail_url: row.thumbnail_url,
          created_by: row.created_by,
          author_name: row.author_name,
          author_username: row.author_username,
          created_at: row.created_at,
          updated_at: row.updated_at,
          deleted_at: row.deleted_at,
          organization_id: row.organization_id,
          is_favorite: row.is_favorite || false,
        }));

        return {
          projects,
          total,
          page,
          limit,
          hasMore: page * limit < total,
        };
      } catch (error) {
        console.error('Database query error:', error);
        console.error('Query:', projectsQuery);
        console.error('Params:', queryParams);
        throw error;
      }
    } finally {
      client.release();
    }
  }

  static async getProject(
    id: string,
    userId?: string
  ): Promise<Project | null> {
    const client = await pool.connect();

    try {
      let query: string;
      const queryParams: (string | number | boolean | string[])[] = [id];

      if (userId) {
        query = `
          SELECT 
            p.*,
            u.display_name as author_name,
            u.username as author_username,
            CASE WHEN pl.project_id IS NOT NULL THEN true ELSE false END as is_favorite
          FROM projects p
          LEFT JOIN users u ON p.created_by = u.id
          LEFT JOIN project_likes pl ON p.id = pl.project_id AND pl.user_id = $2
          WHERE p.id = $1 AND p.deleted_at IS NULL
        `;
        queryParams.push(userId);
      } else {
        query = `
          SELECT 
            p.*,
            u.display_name as author_name,
            u.username as author_username,
            false as is_favorite
          FROM projects p
          LEFT JOIN users u ON p.created_by = u.id
          WHERE p.id = $1 AND p.deleted_at IS NULL
        `;
      }

      const result = await client.query(query, queryParams);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        status: row.status,
        duration_seconds: parseFloat(row.duration_seconds) || 0,
        resolution_width: row.resolution_width,
        resolution_height: row.resolution_height,
        frame_rate: row.frame_rate ? parseFloat(row.frame_rate) : undefined,
        difficulty_level: row.difficulty_level,
        estimated_hours: row.estimated_hours
          ? parseFloat(row.estimated_hours)
          : undefined,
        tags: row.tags || [],
        thumbnail_url: row.thumbnail_url,
        created_by: row.created_by,
        author_name: row.author_name,
        author_username: row.author_username,
        created_at: row.created_at,
        updated_at: row.updated_at,
        deleted_at: row.deleted_at,
        organization_id: row.organization_id,
        is_favorite: row.is_favorite || false,
      };
    } finally {
      client.release();
    }
  }

  static async updateProject(
    id: string,
    updates: Partial<Project>
  ): Promise<Project> {
    const client = await pool.connect();

    try {
      // Build dynamic update query
      const updateFields: string[] = [];
      const queryParams: (string | number | boolean | string[])[] = [id];
      let paramIndex = 2;

      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'created_at' && key !== 'created_by') {
          updateFields.push(`${key} = $${paramIndex}`);
          queryParams.push(value);
          paramIndex++;
        }
      });

      if (updateFields.length === 0) {
        throw new Error('No valid fields to update');
      }

      // Add updated_at timestamp
      updateFields.push('updated_at = CURRENT_TIMESTAMP');

      const query = `
        UPDATE projects 
        SET ${updateFields.join(', ')}
        WHERE id = $1 AND deleted_at IS NULL
        RETURNING *
      `;

      const result = await client.query(query, queryParams);

      if (result.rows.length === 0) {
        throw new Error('Project not found');
      }

      const row = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        status: row.status,
        duration_seconds: parseFloat(row.duration_seconds) || 0,
        resolution_width: row.resolution_width,
        resolution_height: row.resolution_height,
        frame_rate: row.frame_rate ? parseFloat(row.frame_rate) : undefined,
        difficulty_level: row.difficulty_level,
        estimated_hours: row.estimated_hours
          ? parseFloat(row.estimated_hours)
          : undefined,
        tags: row.tags || [],
        thumbnail_url: row.thumbnail_url,
        created_by: row.created_by,
        author_name: row.author_name,
        author_username: row.author_username,
        created_at: row.created_at,
        updated_at: row.updated_at,
        deleted_at: row.deleted_at,
        organization_id: row.organization_id,
        is_favorite: false, // Default to false for update operations
      };
    } finally {
      client.release();
    }
  }

  static async deleteProject(id: string): Promise<void> {
    const client = await pool.connect();

    try {
      // Soft delete - set deleted_at timestamp
      const query = `
        UPDATE projects 
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE id = $1 AND deleted_at IS NULL
      `;

      const result = await client.query(query, [id]);

      if (result.rowCount === 0) {
        throw new Error('Project not found');
      }
    } finally {
      client.release();
    }
  }

  static async toggleFavorite(
    projectId: string,
    userId: string
  ): Promise<{ isFavorite: boolean }> {
    const client = await pool.connect();

    try {
      // Check if the user has already liked this project
      const checkQuery = `
        SELECT id FROM project_likes 
        WHERE project_id = $1 AND user_id = $2
      `;

      const checkResult = await client.query(checkQuery, [projectId, userId]);

      if (checkResult.rows.length > 0) {
        // Unlike - remove the like
        const deleteQuery = `
          DELETE FROM project_likes 
          WHERE project_id = $1 AND user_id = $2
        `;
        await client.query(deleteQuery, [projectId, userId]);

        return { isFavorite: false };
      } else {
        // Like - add the like
        const insertQuery = `
          INSERT INTO project_likes (project_id, user_id)
          VALUES ($1, $2)
        `;
        await client.query(insertQuery, [projectId, userId]);

        return { isFavorite: true };
      }
    } finally {
      client.release();
    }
  }

  static async getProjectStats(organizationId?: string): Promise<ProjectStats> {
    const client = await pool.connect();

    try {
      let whereClause = 'WHERE deleted_at IS NULL';
      const queryParams: (string | number | boolean | string[])[] = [];

      if (organizationId) {
        whereClause += ' AND organization_id = $1';
        queryParams.push(organizationId);
      }

      const query = `
        SELECT 
          COUNT(*) as total,
          COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft,
          COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress,
          COUNT(CASE WHEN status = 'review' THEN 1 END) as review,
          COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as published,
          COUNT(CASE WHEN status = 'archived' THEN 1 END) as archived,
          COALESCE(SUM(duration_seconds), 0) as total_duration,
          0 as total_views,
          0 as total_likes
        FROM projects
        ${whereClause}
      `;

      const result = await client.query(query, queryParams);
      const row = result.rows[0];

      return {
        total: parseInt(row.total),
        draft: parseInt(row.draft),
        in_progress: parseInt(row.in_progress),
        review: parseInt(row.review),
        approved: parseInt(row.approved),
        published: parseInt(row.published),
        archived: parseInt(row.archived),
        total_duration: parseFloat(row.total_duration),
        total_views: parseInt(row.total_views),
        total_likes: parseInt(row.total_likes),
      };
    } finally {
      client.release();
    }
  }

  static async incrementViewCount(
    projectId: string,
    userId: string
  ): Promise<void> {
    const client = await pool.connect();

    try {
      // Insert a view record
      const insertQuery = `
        INSERT INTO project_views (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (project_id, user_id) DO NOTHING
      `;

      await client.query(insertQuery, [projectId, userId]);
    } finally {
      client.release();
    }
  }

  static async createProject(
    projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Project> {
    const client = await pool.connect();

    try {
      const query = `
        INSERT INTO projects (
          name, slug, description, status, duration_seconds,
          resolution_width, resolution_height, frame_rate,
          difficulty_level, estimated_hours, tags, thumbnail_url,
          created_by, organization_id
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        ) RETURNING *
      `;

      const values = [
        projectData.name,
        projectData.slug,
        projectData.description,
        projectData.status,
        projectData.duration_seconds,
        projectData.resolution_width,
        projectData.resolution_height,
        projectData.frame_rate,
        projectData.difficulty_level,
        projectData.estimated_hours,
        projectData.tags,
        projectData.thumbnail_url,
        projectData.created_by,
        projectData.organization_id,
      ];

      const result = await client.query(query, values);
      const row = result.rows[0];

      return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        status: row.status,
        duration_seconds: parseFloat(row.duration_seconds) || 0,
        resolution_width: row.resolution_width,
        resolution_height: row.resolution_height,
        frame_rate: row.frame_rate ? parseFloat(row.frame_rate) : undefined,
        difficulty_level: row.difficulty_level,
        estimated_hours: row.estimated_hours
          ? parseFloat(row.estimated_hours)
          : undefined,
        tags: row.tags || [],
        thumbnail_url: row.thumbnail_url,
        created_by: row.created_by,
        author_name: undefined,
        author_username: undefined,
        created_at: row.created_at,
        updated_at: row.updated_at,
        deleted_at: row.deleted_at,
        organization_id: row.organization_id,
        is_favorite: false, // Default to false for new projects
      };
    } finally {
      client.release();
    }
  }
}
