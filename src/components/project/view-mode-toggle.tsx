import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Grid, List } from 'lucide-react';

interface ViewModeToggleProps {
  value: 'grid' | 'list';
  onValueChange: (mode: 'grid' | 'list') => void;
  className?: string;
}

export function ViewModeToggle({
  value,
  onValueChange,
  className = '',
}: ViewModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(newValue) => onValueChange(newValue as 'grid' | 'list')}
      className={className}
    >
      <ToggleGroupItem
        value="grid"
        aria-label="Grid view"
        className={`transition-colors ${
          value === 'grid'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="list"
        aria-label="List view"
        className={`transition-colors ${
          value === 'list'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
