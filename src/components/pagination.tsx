import { Button } from '@/components/ui/button';

interface PaginationProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  className?: string;
}

export function Pagination({
  hasMore,
  isLoading,
  onLoadMore,
  loadMoreText = 'Load More Projects',
  className = '',
}: PaginationProps) {
  if (!hasMore) return null;

  return (
    <div className={`mt-8 flex justify-center ${className}`}>
      <Button variant="outline" onClick={onLoadMore} disabled={isLoading}>
        {loadMoreText}
      </Button>
    </div>
  );
}
