import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Folder,
  Clock,
  User,
  Calendar,
  Play,
  Edit,
  Star,
  Trash2,
} from 'lucide-react';

import { formatDuration, formatResolution } from '@/lib/utils/project-utils';
import type { Project } from '@/lib/types/project';

interface ProjectListItemProps {
  project: Project;
  onToggleFavorite: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  isFavoritePending?: boolean;
  isDeletePending?: boolean;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export function ProjectListItem({
  project,
  onToggleFavorite,
  onDeleteProject,
  isFavoritePending = false,
  isDeletePending = false,
  getStatusColor,
  getStatusLabel,
}: ProjectListItemProps) {
  const handleToggleFavorite = async () => {
    onToggleFavorite(project.id);
  };

  return (
    <Card className="hover:border-border/60 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="bg-muted relative flex h-12 w-16 flex-shrink-0 items-center justify-center rounded">
            {project.thumbnail_url ? (
              <Image
                src={project.thumbnail_url}
                alt={project.name}
                fill
                className="rounded object-cover"
                sizes="64px"
              />
            ) : (
              <Folder className="text-muted-foreground h-6 w-6" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center space-x-3">
              <h3 className="text-foreground truncate text-sm font-semibold">
                {project.name}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(project.status)}`}
              >
                {getStatusLabel(project.status)}
              </span>
            </div>
            <p className="text-muted-foreground mb-2 text-xs">
              {project.description || 'No description'}
            </p>

            <div className="text-muted-foreground flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatDuration(project.duration_seconds)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>
                  {project.author_name ||
                    project.author_username ||
                    'Unknown Author'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              {project.resolution_width && project.resolution_height && (
                <div className="flex items-center space-x-1">
                  <span>
                    {formatResolution(
                      project.resolution_width,
                      project.resolution_height
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {project.tags.slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs">
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="h-8 w-8 p-0"
              disabled={isFavoritePending}
            >
              <Star
                className={`h-4 w-4 ${project.is_favorite ? 'fill-current' : ''}`}
                style={{ color: project.is_favorite ? '#fbbf24' : '#fbbf24' }}
              />
            </Button>

            <Link href={`/editor/${project.id}`}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 px-3 text-xs">
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
            </Link>

            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Play className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteProject(project.id)}
              className="text-destructive hover:text-destructive h-8 w-8 p-0"
              disabled={isDeletePending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
