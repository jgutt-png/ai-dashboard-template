'use client';

import { getInitials, truncate } from '@/lib/utils';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownItem,
  DropdownSeparator,
} from './ui/catalyst-dropdown';
import { Skeleton } from './ui/skeleton';

interface UserDropdownProps {
  getCurrentUser: () => Promise<User | null>;
}

export default function UserDropdown({ getCurrentUser }: UserDropdownProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    fetchUser();
  }, [getCurrentUser]);

  if (loading) {
    return <Skeleton className="h-10 w-full bg-primary/10 md:mb-4" />;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="flex flex-col gap-1 md:mb-4">
      <div className="my-1 w-full border-b border-foreground/10"></div>
      <Dropdown>
        <DropdownButton className="relative flex h-10 w-full justify-between bg-transparent p-2 text-left hover:bg-accent hover:text-accent-foreground focus:ring-0 focus:ring-offset-0 shadow-none ring-0 border-0">
          <div className="flex items-center min-w-0">
            <Avatar className="mr-3 h-8 w-8 shrink-0">
              <AvatarImage
                src={user.image || ''}
                alt={user.name || user.email || ''}
              />
              <AvatarFallback>
                {getInitials(user.name || user.email)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-muted-foreground truncate">
              {user.name || truncate(user.email!, 18)}
            </span>
          </div>
          <ChevronUpDownIcon className="h-4 w-4 text-muted-foreground/60 shrink-0" />
        </DropdownButton>
        <DropdownItems className="w-[calc(100vw-40px)] sm:w-[250px]" anchor="top end">
          <div className="px-4 py-3 text-sm">
            <div className="font-medium">{user?.name}</div>
            <div className="text-muted-foreground">{user.email}</div>
          </div>
          <DropdownSeparator />
          <DropdownItem>
            <Link href="/home" className="w-full">Dashboard</Link>
          </DropdownItem>
          <DropdownItem>
            <Link href="/home/billing" className="w-full">Billing</Link>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem
            onClick={() => {
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              });
            }}>
            Log out
          </DropdownItem>
        </DropdownItems>
      </Dropdown>
    </div>
  );
}
