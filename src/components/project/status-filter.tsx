import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StatusFilterProps {
  value?: string;
  onStatusChange: (status: string) => void;
  className?: string;
}

export function StatusFilter({
  value = 'all',
  onStatusChange,
  className = '',
}: StatusFilterProps) {
  return (
    <Select onValueChange={onStatusChange} defaultValue={value}>
      <SelectTrigger className={`w-[180px] ${className}`}>
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="review">Review</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="archived">Archived</SelectItem>
      </SelectContent>
    </Select>
  );
}
