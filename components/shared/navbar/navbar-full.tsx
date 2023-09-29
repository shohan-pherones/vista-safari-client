import CustomLink from '@/components/ui/custom-link';
import { menuType } from '@/types/menu';

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
  return (
    <header className='flex h-20 items-center'>
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

        <nav className='flex justify-end gap-5 uppercase'>
          <span>Search</span>
          <span>Sign In</span>
        </nav>
      </div>
    </header>
  );
};

export default NavbarFull;
