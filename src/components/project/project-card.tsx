import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Folder,
  Clock,
  User,
  Calendar,
  MoreVertical,
  Play,
  Edit,
  Star,
} from 'lucide-react';

import { formatDuration } from '@/lib/utils/project-utils';
import type { Project } from '@/lib/types/project';

interface ProjectCardProps {
  project: Project;
  onToggleFavorite: (projectId: string) => void;
  onProjectClick: (projectId: string) => void;
  isFavoritePending?: boolean;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export function ProjectCard({
  project,
  onToggleFavorite,
  onProjectClick,
  isFavoritePending = false,
  getStatusColor,
  getStatusLabel,
}: ProjectCardProps) {
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(project.id);
  };

  return (
    <Card
      className="hover:border-border/60 group cursor-pointer transition-colors"
      onClick={() => onProjectClick(project.id)}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <div className="bg-muted flex h-40 w-full items-center justify-center rounded-t-lg">
            {project.thumbnail_url ? (
              <Image
                src={project.thumbnail_url}
                alt={project.name}
                fill
                className="rounded-t-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <Folder className="text-muted-foreground h-12 w-12" />
            )}
          </div>
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="bg-background/80 hover:bg-background/90 text-foreground h-7 w-7 p-0 backdrop-blur-sm"
              disabled={isFavoritePending}
            >
              <Star
                className={`h-3 w-3 ${project.is_favorite ? 'fill-current' : ''}`}
                style={{ color: project.is_favorite ? '#fbbf24' : '#fbbf24' }}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-background/80 hover:bg-background/90 text-foreground h-7 w-7 p-0 backdrop-blur-sm"
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(project.status)}`}
            >
              {getStatusLabel(project.status)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-foreground mb-1 truncate text-sm font-semibold">
              {project.name}
            </h3>
            <p className="text-muted-foreground text-xs">
              {project.description || 'No description'}
            </p>
          </div>

          <div className="text-muted-foreground flex items-center justify-between text-xs">
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
          </div>

          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(project.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Link
              href={`/editor/${project.id}`}
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-8 w-full text-xs">
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Play className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
