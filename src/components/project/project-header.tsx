import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProjectHeaderProps {
  title?: string;
  showNewProjectButton?: boolean;
  onNewProject?: () => void;
}

export function ProjectHeader({
  title = 'Projects',
  showNewProjectButton = true,
  onNewProject,
}: ProjectHeaderProps) {
  return (
    <header className="bg-card border-border border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-foreground text-2xl font-bold">Kira Media</h1>
          <div className="bg-border h-8 w-px"></div>
          <h2 className="text-foreground text-lg font-medium">{title}</h2>
        </div>

        {showNewProjectButton && (
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
              onClick={onNewProject}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
