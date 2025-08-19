interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = 'Loading projects...',
  className = '',
}: LoadingStateProps) {
  return (
    <div className={`py-12 text-center ${className}`}>
      <div className="border-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
