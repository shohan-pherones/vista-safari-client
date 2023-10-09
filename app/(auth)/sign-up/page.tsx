'use client';

import { useScrollContext } from '@/contexts/scroll-context';
import { cn } from '@/lib/utils';
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Image from 'next/image';
import Link from 'next/link';
import FooterMini from '@/components/shared/footer/footer-mini';
import NavbarMini from '@/components/shared/navbar/navbar-mini';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fullUserType } from '@/types/full-user';
import { axiosPost } from '@/lib/axios-post';
import { login } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';
import {
  registerValidator,
  registerValidatorType,
} from '@/validators/register-validator';

interface FormData {
  name: string;
  photoUrl: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    photoUrl: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const { isScrolled } = useScrollContext();

  const router = useRouter();
  const dispath = useDispatch();

  const formSubject = useRef<Subject<void>>(new Subject<void>());
  const formSubscription = useRef<Subscription | null>(null);

  useEffect(() => {
    const subjectRef = formSubject.current;

    formSubscription.current = fromEvent(
      document.getElementById('form')!,
      'submit'
    )
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(formSubject.current)
      )
      .subscribe(async () => {
        const { isValid, message }: registerValidatorType = registerValidator(
          formData.email,
          formData.password,
          formData.photoUrl
        );

        if (isValid) {
          const data: fullUserType = await axiosPost(
            '/api/users/register',
            formData
          );

          if (data) {
            dispath(login(data));
            router.push('/');
            toast.success('Register success');
            setFormData({
              name: '',
              photoUrl: '',
              email: '',
              password: '',
              address: '',
              phoneNumber: '',
            });
            setFormSubmitted(true);
          }
        } else {
          message.email && toast.error(message.email);
          message.password && toast.error(message.password);
          message.photoUrl && toast.error(message.photoUrl);
        }
      });

    return () => {
      if (formSubscription.current) {
        formSubscription.current.unsubscribe();
      }
      subjectRef.complete();
    };
  }, [formData, router, dispath]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    formSubject.current.next();
  };

  return (
    <>
      <NavbarMini />
      <main className={cn(isScrolled ? 'mt-20' : 'mt-0')}>
        <section className='grid min-h-screen grid-cols-1 lg:grid-cols-7'>
          <div className='hidden h-full w-full overflow-hidden lg:col-span-3 lg:block'>
            <div className='relative h-full w-full overflow-hidden'>
              <div className='absolute bottom-0 left-0 right-0 top-0 z-[1] h-full w-full bg-gradient-to-b from-black/50 to-transparent'></div>
              <div className='absolute bottom-0 left-0 right-0 top-0 z-[2] h-full w-full px-20 pt-40 text-center text-white/80'>
                <h4>
                  “When preparing to travel, lay out all your clothes and all
                  your money. Then take half the clothes and twice the money.” –
                  Susan Heller
                </h4>
              </div>
              <Image
                className='h-full w-full object-cover'
                width={1280}
                height={720}
                priority
                src='https://images.pexels.com/photos/2499699/pexels-photo-2499699.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt='Back View of a Woman Walking Towards the Famous Bali Handara Gate'
              />
            </div>
          </div>

          <div className='flex h-full w-full justify-center px-20 pt-20 lg:col-span-4 lg:pt-40'>
            <form id='form' className='h-full w-1/2 ' onSubmit={handleSubmit}>
              <h4>Create an account</h4>
              <p className='mb-5 text-black/30'>Please enter your deatils</p>
              <div className='mb-5 flex flex-col gap-2.5'>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='name'
                    className='eq cursor-pointer self-start hover:text-black/80'
                  >
                    Name
                  </label>
                  <input
                    className='eq w-full appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
                    type='text'
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder='Sarah Parker'
                    id='name'
                    name='name'
                    minLength={3}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='photoUrl'
                    className='eq cursor-pointer self-start hover:text-black/80'
                  >
                    Photo URL
                  </label>
                  <input
                    className='eq w-full appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
                    type='text'
                    value={formData.photoUrl}
                    onChange={handleInputChange}
                    placeholder='Paste your photo url from pexels or cloudinary'
                    id='photoUrl'
                    name='photoUrl'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='email'
                    className='eq cursor-pointer self-start hover:text-black/80'
                  >
                    Email address
                  </label>
                  <input
                    className='eq w-full appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='hello@example.com'
                    id='email'
                    name='email'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='password'
                    className='eq cursor-pointer self-start hover:text-black/80'
                  >
                    Password
                  </label>
                  <input
                    className='eq w-full appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
                    type='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder='enter your password'
                    id='password'
                    name='password'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='address'
                    className='eq cursor-pointer self-start hover:text-black/80'
                  >
                    Address (Optional)
                  </label>
                  <input
                    className='eq w-full appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
                    type='text'
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder='123 Main Street, TA'
                    id='address'
                    name='address'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='phoneNumber'
                    className='eq cursor-pointer self-start hover:text-black/80'
                  >
                    Phone number (Optional)
                  </label>
                  <input
                    className='eq w-full appearance-none rounded-lg border border-black/30 bg-transparent px-3 py-2.5 outline-none hover:border-black/50 focus:border-black'
                    type='tel'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder='+123456789'
                    id='phoneNumber'
                    name='phoneNumber'
                  />
                </div>
              </div>
              <Button type='submit' size={'full'}>
                Register
              </Button>
              <p className='mt-2.5'>
                Already have an account?{' '}
                <Link
                  className='eq font-semibold text-envy hover:text-envy/80'
                  href={'/sign-in'}
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
      <FooterMini />
    </>
  );
};

export default SignUpPage;
