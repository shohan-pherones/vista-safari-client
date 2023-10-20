'use client';

import FooterMini from '@/components/shared/footer/footer-mini';
import NavbarFull from '@/components/shared/navbar/navbar-full';
import SectionTitle from '@/components/shared/section-title';
import Button from '@/components/ui/button';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const auth = useSelector((state: RootState) => state.auth.fullUser);

  const router = useRouter();

  if (!auth?.user) {
    router.push('/');
    return null;
  }

  return (
    <>
      <NavbarFull />
      <main>
        <section className='container grid min-h-screen grid-cols-3 gap-20 py-20'>
          <div className='col-span-1 h-full w-full overflow-hidden'>
            <div className='h-[40rem] w-full overflow-hidden rounded'>
              <Image
                src={
                  auth?.user.photoUrl! ||
                  'https://images.pexels.com/photos/5929944/pexels-photo-5929944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                }
                alt={auth?.user.name!}
                width={360}
                height={640}
                priority
                className='h-full w-full object-cover'
              />
            </div>
          </div>

          <div className='col-span-2 h-full w-full overflow-hidden'>
            <div>
              <SectionTitle
                subtitle='My Profile'
                title='Customize your profile'
              />
            </div>

            <div className='mt-10 flex flex-col gap-0'>
              <p>
                <strong>Name:</strong> {auth?.user.name}
              </p>
              <p>
                <strong>Email address:</strong> {auth?.user.email}
              </p>
              <p>
                <strong>Phone number:</strong>{' '}
                {auth?.user.phoneNumber || 'Not added yet'}
              </p>
              <p>
                <strong>Address:</strong>{' '}
                {auth?.user.address || 'Not added yet'}
              </p>
            </div>

            <div className='mt-10 flex gap-5'>
              <Button>Update profile</Button>
              <Button variant='danger'>Delete profile</Button>
            </div>
          </div>
        </section>
      </main>
      <FooterMini />
    </>
  );
};

export default ProfilePage;
