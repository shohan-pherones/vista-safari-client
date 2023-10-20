'use client';

import Button, { buttonVariants } from '@/components/ui/button';
import CustomLink from '@/components/ui/custom-link';
import { useScrollContext } from '@/contexts/scroll-context';
import { cn } from '@/lib/utils';
import { logout } from '@/redux/features/auth/authSlice';
import { RootState } from '@/redux/store';
import { menuType } from '@/types/menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
            <>
              <div className='relative'>
                <button
                  onClick={() =>
                    setShouldProfileMenuShown(!shouldProfileMenuShown)
                  }
                  className={cn(
                    'eq group inline-block h-10 w-10 overflow-hidden rounded-full active:scale-105',
                    auth?.user.photoUrl === '' &&
                      'flex items-center justify-center bg-envy'
                  )}
                >
                  {auth?.user.photoUrl === '' ? (
                    <h6 className='font-bold'>
                      {auth?.user.name?.charAt(0).toLocaleUpperCase()}
                    </h6>
                  ) : (
                    <Image
                      src={auth.user.photoUrl!}
                      alt={auth.user.name!}
                      width={128}
                      height={128}
                      priority
                      className='eq h-full w-full object-cover  group-hover:brightness-75'
                    />
                  )}
                </button>

                {/* PROFILE MENU POP-UP */}
                {shouldProfileMenuShown && (
                  <div className='absolute right-0 top-full z-[102] flex w-[20rem] flex-col gap-3 rounded-xl border bg-white p-7 shadow-lg'>
                    <CustomLink
                      href='/profile'
                      title='Profile'
                      className='uppercase'
                    />
                    {auth?.user.role === 'admin' && (
                      <>
                        <CustomLink
                          href='/admin/create/locations'
                          title='Add New Location'
                          className='uppercase'
                        />
                        <CustomLink
                          href='/admin/manage/locations'
                          title='Manage Locations'
                          className='uppercase'
                        />
                        <CustomLink
                          href='/admin/manage/users'
                          title='Manage Users'
                          className='uppercase'
                        />
                        <CustomLink
                          href='/admin/manage/bookings'
                          title='Manage Bookings'
                          className='uppercase'
                        />
                      </>
                    )}
                    <Button onClick={() => dispatch(logout())} variant='danger'>
                      Sign out
                    </Button>
                  </div>
                )}
              </div>

              {/* PROFILE MENU POP-UP OVERLAY */}
              {shouldProfileMenuShown && (
                <div
                  onClick={() => setShouldProfileMenuShown(false)}
                  className='fixed bottom-0 left-0 right-0 top-0 z-[101] h-full w-full bg-transparent'
                ></div>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavbarFull;
