export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status:
    | 'draft'
    | 'in_progress'
    | 'review'
    | 'approved'
    | 'published'
    | 'archived'
    | 'deleted';
  duration_seconds: number;
  resolution_width?: number;
  resolution_height?: number;
  frame_rate?: number;
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimated_hours?: number;
  tags: string[];
  thumbnail_url?: string;
  created_by: string;
  author_name?: string;
  author_username?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  organization_id?: string;
  is_favorite?: boolean;
  // Updated to include author information, favorite status, and all required fields
}

export interface ProjectStats {
  total: number;
  draft: number;
  in_progress: number;
  published: number;
  total_duration: number;
  total_views: number;
}

export interface ProjectFilters {
  status?: string;
  sort_by?: 'name' | 'created_at' | 'updated_at' | 'duration_seconds';
  sort_order?: 'asc' | 'desc';
  difficulty_level?: string;
  search?: string;
}
