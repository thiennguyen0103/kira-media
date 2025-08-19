// Helper function to format duration from seconds
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Helper function to format resolution
export function formatResolution(width?: number, height?: number): string {
  if (width && height) {
    return `${width}x${height}`;
  }
  return 'Unknown';
}

// Helper function to get status color classes
export function getStatusColor(status: string): string {
  switch (status) {
    case 'draft':
      return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
    case 'in_progress':
      return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
    case 'review':
      return 'bg-orange-500/20 text-orange-600 border-orange-500/30';
    case 'approved':
      return 'bg-green-500/20 text-green-600 border-green-500/30';
    case 'completed':
      return 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30';
    case 'archived':
      return 'bg-muted text-muted-foreground border-border';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}

// Helper function to get status label
export function getStatusLabel(status: string): string {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'in_progress':
      return 'In Progress';
    case 'review':
      return 'Review';
    case 'approved':
      return 'Approved';
    case 'completed':
      return 'Completed';
    case 'archived':
      return 'Archived';
    default:
      return 'Unknown';
  }
}
