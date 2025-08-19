import { useState, useOptimistic, startTransition } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { ProjectHeader } from './project-header';
import { ProjectStatsBar } from './project-stats';
import { ProjectFilters } from './project-filters';
import { ProjectGrid } from './project-grid';
import { ProjectListView } from './project-list-view';
import { LoadingState } from '../loading-state';
import { EmptyState } from '../empty-state';
import { Pagination } from '../pagination';
import { getStatusColor, getStatusLabel } from '@/lib/utils/project-utils';
import type { ProjectFilters as ProjectFiltersType } from '@/lib/types/project';
import {
  useProjects,
  useProjectStats,
  useToggleFavorite,
  useDeleteProject,
  useIncrementViewCount,
} from '@/lib/hooks/use-projects';

interface ProjectListProps {
  title?: string;
  showNewProjectButton?: boolean;
  onNewProject?: () => void;
  className?: string;
}

export function ProjectList({
  title = 'Projects',
  showNewProjectButton = true,
  onNewProject,
  className = '',
}: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProjectFiltersType>({
    status: 'all',
    sort_by: 'created_at',
    sort_order: 'desc',
  });
  const [page, setPage] = useState(1);
  const limit = 12;

  // Debounce the search term to reduce API calls
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 500);

  // Mock user ID for now - in a real app this would come from auth context
  const currentUserId = 'mock-user-id';

  // Fetch projects with TanStack Query using debounced search
  const {
    data: projectsData,
    isLoading,
    error,
    refetch,
  } = useProjects({ ...filters, search: debouncedSearchTerm }, page, limit);

  // Fetch project statistics
  const { data: stats } = useProjectStats();

  // Mutations
  const toggleFavorite = useToggleFavorite();
  const deleteProject = useDeleteProject();
  const incrementViewCount = useIncrementViewCount();

  const projects = projectsData?.projects || [];
  const hasMore = projectsData?.hasMore || false;

  // Optimistic state for favorites
  const [optimisticProjects, updateOptimisticProjects] = useOptimistic(
    projects,
    (
      state,
      { projectId, isFavorite }: { projectId: string; isFavorite: boolean }
    ) =>
      state.map((project) =>
        project.id === projectId
          ? { ...project, is_favorite: isFavorite }
          : project
      )
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: status === 'all' ? undefined : status,
    }));
    setPage(1);
  };

  const handleSort = (sortBy: ProjectFiltersType['sort_by']) => {
    setFilters((prev) => ({
      ...prev,
      sort_by: sortBy,
      sort_order:
        prev.sort_by === sortBy && prev.sort_order === 'asc' ? 'desc' : 'asc',
    }));
    setPage(1);
  };

  const handleToggleFavorite = async (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newFavoriteStatus = !project.is_favorite;

    // Update optimistic state immediately
    startTransition(() => {
      updateOptimisticProjects({ projectId, isFavorite: newFavoriteStatus });
    });

    try {
      await toggleFavorite.mutateAsync({
        id: projectId,
        userId: currentUserId,
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      // Revert optimistic update on error
      startTransition(() => {
        updateOptimisticProjects({ projectId, isFavorite: !newFavoriteStatus });
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (
      confirm(
        'Are you sure you want to delete this project? This action cannot be undone.'
      )
    ) {
      try {
        await deleteProject.mutateAsync(projectId);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleProjectClick = (projectId: string) => {
    // Increment view count when project is clicked
    incrementViewCount.mutate(projectId);
  };

  const handleResetFilters = () => {
    setFilters({
      status: undefined,
      sort_by: 'created_at',
      sort_order: 'desc',
      difficulty_level: 'all',
    });
    setSearchTerm('');
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (error) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load projects</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-background min-h-screen ${className}`}>
      <ProjectHeader
        title={title}
        showNewProjectButton={showNewProjectButton}
        onNewProject={onNewProject}
      />

      {stats && <ProjectStatsBar stats={stats} />}

      <div className="p-6">
        <ProjectFilters
          searchTerm={searchTerm}
          viewMode={viewMode}
          filters={filters}
          onSearchChange={handleSearch}
          onViewModeChange={setViewMode}
          onFiltersChange={setFilters}
          onStatusFilterChange={handleStatusFilter}
          onSortChange={handleSort}
          onResetFilters={handleResetFilters}
        />

        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Projects Grid/List */}
        {!isLoading && projects.length > 0 && (
          <>
            {viewMode === 'grid' ? (
              <ProjectGrid
                projects={optimisticProjects}
                onToggleFavorite={handleToggleFavorite}
                onProjectClick={handleProjectClick}
                isFavoritePending={toggleFavorite.isPending}
                getStatusColor={getStatusColor}
                getStatusLabel={getStatusLabel}
              />
            ) : (
              <ProjectListView
                projects={optimisticProjects}
                onToggleFavorite={handleToggleFavorite}
                onDeleteProject={handleDeleteProject}
                isFavoritePending={toggleFavorite.isPending}
                isDeletePending={deleteProject.isPending}
                getStatusColor={getStatusColor}
                getStatusLabel={getStatusLabel}
              />
            )}

            <Pagination
              hasMore={hasMore}
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
            />
          </>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <EmptyState onButtonClick={onNewProject} />
        )}
      </div>
    </div>
  );
}
