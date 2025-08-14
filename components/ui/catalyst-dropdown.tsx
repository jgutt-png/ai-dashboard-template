'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Fragment } from 'react';

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

interface DropdownButtonProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

interface DropdownItemsProps {
  children: React.ReactNode;
  className?: string;
  anchor?: string;
}

interface DropdownItemProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function Dropdown({ children, className, ...props }: DropdownProps) {
  return (
    <Menu as="div" className={clsx('relative inline-block text-left', className)} {...props}>
      {children}
    </Menu>
  );
}

function DropdownButton({ children, className, ...props }: DropdownButtonProps) {
  return (
    <MenuButton
      className={clsx(
        'inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
    </MenuButton>
  );
}

function DropdownItems({ children, className, anchor, ...props }: DropdownItemsProps) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <MenuItems
        anchor={anchor as any}
        className={clsx(
          'z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-800 dark:bg-gray-900 dark:ring-gray-800',
          className
        )}
        {...props}
      >
        {children}
      </MenuItems>
    </Transition>
  );
}

function DropdownItem({ children, className, href, onClick, disabled = false, ...props }: DropdownItemProps) {
  const Component = href ? 'a' : 'button';

  return (
    <MenuItem disabled={disabled}>
      {({ focus, disabled: itemDisabled }) => (
        <Component
          href={href}
          onClick={onClick}
          className={clsx(
            focus ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-200',
            itemDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            'group flex items-center px-4 py-2 text-sm w-full text-left',
            className
          )}
          disabled={itemDisabled}
          {...props}
        >
          {children}
        </Component>
      )}
    </MenuItem>
  );
}

function DropdownSeparator({ className }: { className?: string }) {
  return <div className={clsx('mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700', className)} />;
}

export {
  Dropdown,
  DropdownButton,
  DropdownItems,
  DropdownItem,
  DropdownSeparator,
};