import { RootLayoutProps } from '@/types';
import { CollapsibleSidebar } from './collapsible-sidebar';

export default async function NavigationShell({ children }: RootLayoutProps) {
  return (
    <CollapsibleSidebar>
      {children}
    </CollapsibleSidebar>
  );
}
