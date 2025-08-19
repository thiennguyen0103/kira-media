import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type Project,
  type ProjectFilters,
  type ProjectListResponse,
  type ProjectStats,
} from '@/lib/api';

// API endpoints
const API_BASE = '/api/projects';

// Query keys for caching
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (
    filters: ProjectFilters,
    page: number,
    limit: number,
    userId?: string
  ) => [...projectKeys.lists(), { filters, page, limit, userId }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string, userId?: string) =>
    [...projectKeys.details(), id, userId] as const,
  stats: () => [...projectKeys.all, 'stats'] as const,
};

// Hook for fetching projects with filters and pagination
export function useProjects(
  filters: ProjectFilters,
  page: number = 1,
  limit: number = 12,
  userId?: string
) {
  return useQuery({
    queryKey: projectKeys.list(filters, page, limit, userId),
    queryFn: async (): Promise<ProjectListResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      // Add filters to query params
      if (filters.search) params.append('search', filters.search);
      if (filters.status && filters.status !== 'all')
        params.append('status', filters.status);
      if (filters.created_by) params.append('created_by', filters.created_by);
      if (filters.difficulty_level)
        params.append('difficulty_level', filters.difficulty_level);
      if (filters.sort_by) params.append('sort_by', filters.sort_by);
      if (filters.sort_order) params.append('sort_order', filters.sort_order);
      if (userId) params.append('userId', userId);

      const response = await fetch(`${API_BASE}?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for fetching a single project
export function useProject(id: string, userId?: string) {
  return useQuery({
    queryKey: projectKeys.detail(id, userId),
    queryFn: async (): Promise<Project> => {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);

      const response = await fetch(`${API_BASE}/${id}?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      return response.json();
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook for project statistics
export function useProjectStats(organizationId?: string) {
  return useQuery({
    queryKey: projectKeys.stats(),
    queryFn: async (): Promise<ProjectStats> => {
      const params = new URLSearchParams();
      if (organizationId) params.append('organization_id', organizationId);

      const response = await fetch(`${API_BASE}/stats?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project statistics');
      }
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook for toggling project favorite
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      const response = await fetch(`${API_BASE}/${id}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle favorite');
      }

      return response.json();
    },
    onSuccess: (updatedProject) => {
      // Update the project in the cache
      queryClient.setQueryData(
        projectKeys.detail(updatedProject.id),
        updatedProject
      );

      // Invalidate lists to refresh project data
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

// Hook for deleting a project
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch lists and stats
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.stats() });
    },
  });
}

// Hook for creating a new project
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>
    ) => {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch lists and stats
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.stats() });
    },
  });
}

// Hook for incrementing view count
export function useIncrementViewCount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE}/${id}/view`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to increment view count');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.stats() });
    },
  });
}
