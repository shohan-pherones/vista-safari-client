'use client';

import CustomLink from '@/components/ui/custom-link';
import { useScrollContext } from '@/contexts/scroll-context';
import { cn } from '@/lib/utils';

const NavbarMini = () => {
  const { isScrolled } = useScrollContext();

  return (
    <header
      className={cn(
        'eq flex h-20 items-center',
        isScrolled && 'fixed left-0 right-0 top-0 z-[100] w-full bg-cream'
      )}
    >
      <div className='container flex items-center justify-center'>
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
      </div>
    </header>
  );
};

export default NavbarMini;
