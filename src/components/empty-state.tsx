import { Button } from '@/components/ui/button';
import { Folder, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  className?: string;
}

export function EmptyState({
  title = 'No projects found',
  description = 'Try adjusting your search or create a new project',
  buttonText = 'Create New Project',
  onButtonClick,
  showButton = true,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`py-12 text-center ${className}`}>
      <Folder className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
      <h3 className="text-foreground mb-2 text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {showButton && (
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={onButtonClick}
        >
          <Plus className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
}
