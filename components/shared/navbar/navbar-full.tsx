'use client';

import Link from 'next/link';
import CustomLink from '@/components/ui/custom-link';
import SearchBar from './search-bar';
import Button, { buttonVariants } from '@/components/ui/button';
import { useScrollContext } from '@/contexts/scroll-context';
import { cn } from '@/lib/utils';
import { menuType } from '@/types/menu';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { logout } from '@/redux/features/auth/authSlice';

const menuItems = [
  {
    id: '1',
    title: 'Home',
    href: '/',
  },
  {
    id: '2',
    title: 'Destinations',
    href: '/destinations',
  },
];

const NavbarFull = () => {
  const [shouldSearchBarShown, setShouldSearchBarShown] =
    useState<boolean>(false);
  const [shouldProfileMenuShown, setShouldProfileMenuShown] =
    useState<boolean>(false);

  const { isScrolled } = useScrollContext();
  const auth = useSelector((state: RootState) => state.auth.fullUser);

  const dispatch = useDispatch();

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

          {!auth && (
            <Link href='/sign-in' className={buttonVariants()}>
              Sign In
            </Link>
          )}

          {auth && auth?.user && (
            <div className='relative'>
              <button
                onClick={() =>
                  setShouldProfileMenuShown(!shouldProfileMenuShown)
                }
                className='eq group inline-block h-10 w-10 overflow-hidden rounded-full active:scale-105'
              >
                <Image
                  src={auth.user.photoUrl!}
                  alt={auth.user.name!}
                  width={128}
                  height={128}
                  priority
                  className='eq h-full w-full object-cover  group-hover:brightness-75'
                />
              </button>

              {/* PROFILE MENU POP-UP */}
              {shouldProfileMenuShown && (
                <div className='absolute right-0 top-full z-[1] flex flex-col gap-3 rounded-xl border bg-white p-7 shadow-lg'>
                  <Button onClick={() => dispatch(logout())} variant='danger'>
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavbarFull;
