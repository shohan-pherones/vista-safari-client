'use client';

import { buttonVariants } from '@/components/ui/button';
import CustomLink from '@/components/ui/custom-link';
import { useScrollContext } from '@/contexts/scroll-context';
import { cn } from '@/lib/utils';
import { menuType } from '@/types/menu';
import Link from 'next/link';
import { useState } from 'react';
import SearchBar from './search-bar';

const menuItems = [
  {
    id: '1',
    title: 'Home',
    href: '/',
  },
  {
    id: '2',
    title: 'Destinations',
    href: '/',
  },
  {
    id: '3',
    title: 'About',
    href: '/',
  },
  {
    id: '4',
    title: 'Contact',
    href: '/',
  },
  {
    id: '5',
    title: 'Clients',
    href: '/',
  },
];

const NavbarFull = () => {
  const [shouldSearchBarShown, setShouldSearchBarShown] =
    useState<boolean>(false);

  const { isScrolled } = useScrollContext();

  return (
    <header
      className={cn(
        'eq flex h-20 items-center',
        isScrolled && 'fixed left-0 right-0 top-0 z-[100] w-full bg-cream'
      )}
    >
      <div className='container grid grid-cols-3 items-center gap-5'>
        <nav>
          <ul>
            <li className='flex h-full items-center'>
              <CustomLink
                href='/'
                title='Vista Safari'
                className='text-xl font-semibold uppercase tracking-widest'
              />
            </li>
          </ul>
        </nav>

        <nav className='place-self-center'>
          <ul className='flex gap-5'>
            {menuItems.map((item: menuType) => (
              <li key={item.id} className='flex items-center'>
                <CustomLink
                  href={item.href}
                  title={item.title}
                  className='uppercase'
                />
              </li>
            ))}
          </ul>
        </nav>

        <nav className='flex items-center justify-end gap-5 uppercase'>
          <SearchBar
            shouldSearchBarShown={shouldSearchBarShown}
            setShouldSearchBarShown={setShouldSearchBarShown}
          />
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavbarFull;
