import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

export function SearchInput({
  value,
  placeholder = 'Search projects by name, description, or tags...',
  onSearchChange,
  className = '',
}: SearchInputProps) {
  return (
    <div className={`relative max-w-md flex-1 ${className}`}>
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pr-10 pl-10"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSearchChange('')}
          className="hover:bg-muted absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
