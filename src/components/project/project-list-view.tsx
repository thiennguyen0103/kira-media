import { ProjectListItem } from './project-list-item';
import type { Project } from '@/lib/types/project';

interface ProjectListViewProps {
  projects: Project[];
  onToggleFavorite: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  isFavoritePending?: boolean;
  isDeletePending?: boolean;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export function ProjectListView({
  projects,
  onToggleFavorite,
  onDeleteProject,
  isFavoritePending = false,
  isDeletePending = false,
  getStatusColor,
  getStatusLabel,
}: ProjectListViewProps) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          project={project}
          onToggleFavorite={onToggleFavorite}
          onDeleteProject={onDeleteProject}
          isFavoritePending={isFavoritePending}
          isDeletePending={isDeletePending}
          getStatusColor={getStatusColor}
          getStatusLabel={getStatusLabel}
        />
      ))}
    </div>
  );
}
