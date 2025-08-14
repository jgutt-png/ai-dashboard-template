'use client';

import { SideBar } from '@/config/sidebar';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SideBarItems({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const baseStyles = 'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200';
  const styles = isMobile
    ? cn(baseStyles, 'mx-[-0.65rem] gap-4 text-muted-foreground hover:text-foreground hover:bg-accent')
    : cn(baseStyles, 'text-muted-foreground hover:bg-accent hover:text-accent-foreground');

  return SideBar.map((item: NavItem, index) => (
    <Link
      key={item.href || index}
      href={item.href}
      className={cn(
        styles,
        pathname === item.href && 'bg-accent text-accent-foreground',
      )}>
      {item.icon && <item.icon size={18} className="shrink-0" />}
      {item.title}
    </Link>
  ));
}
