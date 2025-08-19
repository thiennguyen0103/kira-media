import { ProjectCard } from './project-card';
import type { Project } from '@/lib/types/project';

interface ProjectGridProps {
  projects: Project[];
  onToggleFavorite: (projectId: string) => void;
  onProjectClick: (projectId: string) => void;
  isFavoritePending?: boolean;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export function ProjectGrid({
  projects,
  onToggleFavorite,
  onProjectClick,
  isFavoritePending = false,
  getStatusColor,
  getStatusLabel,
}: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onToggleFavorite={onToggleFavorite}
          onProjectClick={onProjectClick}
          isFavoritePending={isFavoritePending}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
        />
      ))}
    </div>
  );
}
