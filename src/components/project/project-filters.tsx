import type { ProjectFilters } from '@/lib/types/project';
import { SearchInput } from './search-input';
import { AdvancedFiltersSheet } from './advanced-filters-sheet';
import { StatusFilter } from './status-filter';
import { ViewModeToggle } from './view-mode-toggle';

interface ProjectFiltersProps {
  searchTerm: string;
  viewMode: 'grid' | 'list';
  filters: ProjectFilters;
  onSearchChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onFiltersChange: (filters: ProjectFilters) => void;
  onStatusFilterChange: (status: string) => void;
  onSortChange: (sortBy: ProjectFilters['sort_by']) => void;
  onResetFilters: () => void;
}

export function ProjectFilters({
  searchTerm,
  viewMode,
  filters,
  onSearchChange,
  onViewModeChange,
  onFiltersChange,
  onStatusFilterChange,
  onSortChange,
  onResetFilters,
}: ProjectFiltersProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center space-x-4">
        <SearchInput value={searchTerm} onSearchChange={onSearchChange} />

        <AdvancedFiltersSheet
          filters={filters}
          onFiltersChange={onFiltersChange}
          onSortChange={onSortChange}
          onResetFilters={onResetFilters}
        />

        <StatusFilter
          value={filters.status}
          onStatusChange={onStatusFilterChange}
        />

        <ViewModeToggle value={viewMode} onValueChange={onViewModeChange} />
      </div>
    </div>
  );
}
