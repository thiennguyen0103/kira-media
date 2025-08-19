import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import type { ProjectFilters } from '@/lib/types/project';

interface AdvancedFiltersSheetProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  onSortChange: (sortBy: ProjectFilters['sort_by']) => void;
  onResetFilters: () => void;
}

export function AdvancedFiltersSheet({
  filters,
  onFiltersChange,
  onSortChange,
  onResetFilters,
}: AdvancedFiltersSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-muted-foreground mb-2 block text-xs font-medium">
                Sort By
              </label>
              <Select
                onValueChange={(value) =>
                  onSortChange(value as ProjectFilters['sort_by'])
                }
                defaultValue={filters.sort_by || 'created_at'}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="created_at">Created Date</SelectItem>
                  <SelectItem value="updated_at">Updated Date</SelectItem>
                  <SelectItem value="duration_seconds">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-muted-foreground mb-2 block text-xs font-medium">
                Sort Order
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSortChange(filters.sort_by || 'created_at')}
                className="w-full justify-between"
              >
                <span>
                  {filters.sort_order === 'asc' ? 'Ascending' : 'Descending'}
                </span>
                {filters.sort_order === 'asc' ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div>
              <label className="text-muted-foreground mb-2 block text-xs font-medium">
                Difficulty Level
              </label>
              <Select
                onValueChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    difficulty_level: value === 'all' ? undefined : value,
                  })
                }
                defaultValue={filters.difficulty_level || 'all'}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 border-t pt-4">
            <Button
              variant="ghost"
              onClick={onResetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
