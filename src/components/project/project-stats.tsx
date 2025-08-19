import { formatDuration } from '@/lib/utils/project-utils';
import type { ProjectStats } from '@/lib/types/project';

interface ProjectStatsBarProps {
  stats: ProjectStats;
  className?: string;
}

export function ProjectStatsBar({
  stats,
  className = '',
}: ProjectStatsBarProps) {
  if (!stats) return null;

  return (
    <div
      className={`bg-muted/30 border-border border-b px-6 py-3 ${className}`}
    >
      <div className="flex items-center space-x-6 text-sm">
        <span className="text-muted-foreground">
          Total:{' '}
          <span className="text-foreground font-medium">{stats.total}</span>
        </span>
        <span className="text-muted-foreground">
          Draft:{' '}
          <span className="text-foreground font-medium">{stats.draft}</span>
        </span>
        <span className="text-muted-foreground">
          In Progress:{' '}
          <span className="text-foreground font-medium">
            {stats.in_progress}
          </span>
        </span>
        <span className="text-muted-foreground">
          Completed:{' '}
          <span className="text-foreground font-medium">{stats.published}</span>
        </span>
        <span className="text-muted-foreground">
          Duration:{' '}
          <span className="text-foreground font-medium">
            {formatDuration(stats.total_duration)}
          </span>
        </span>
        <span className="text-muted-foreground">
          Views:{' '}
          <span className="text-foreground font-medium">
            {stats.total_views}
          </span>
        </span>
      </div>
    </div>
  );
}
