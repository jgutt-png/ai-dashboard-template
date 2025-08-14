"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IconSearch, IconBell, IconUser } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

interface GlassmorphicNavbarProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function GlassmorphicNavbar({ title, description, children }: GlassmorphicNavbarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full p-2">
      <div className="backdrop-blur-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm rounded-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-xl font-semibold leading-none tracking-tight text-neutral-700 dark:text-neutral-200"
              >
                {title}
              </motion.h1>
              {description && (
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className="text-sm text-neutral-600 dark:text-neutral-400 mt-1"
                >
                  {description}
                </motion.p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative h-9 w-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <IconBell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs"></span>
            </Button>

            {/* User Avatar */}
            <Link href="/home/settings">
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-0"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <IconUser className="h-4 w-4" />
                )}
              </Button>
            </Link>

            {/* Custom actions */}
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
}