import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export default function SearchBar({ className = '' }: { className?: string }) {
  return (
    <div className="w-full flex-1">
      <form>
        <div className={cn('relative', className)}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full appearance-none bg-background pl-9 pr-3 shadow-none border-muted-foreground/20 focus:border-ring"
          />
        </div>
      </form>
    </div>
  );
}
