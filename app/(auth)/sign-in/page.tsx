'use client';

import FooterMini from '@/components/shared/footer/footer-mini';
import NavbarMini from '@/components/shared/navbar/navbar-mini';
import Button from '@/components/ui/button';
import { useScrollContext } from '@/contexts/scroll-context';
import { axiosPost } from '@/lib/axios-post';
import { cn } from '@/lib/utils';
import { login } from '@/redux/features/auth/authSlice';
import { fullUserType } from '@/types/full-user';
import {
  loginValidator,
  loginValidatorType,
} from '@/validators/login-validator';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface SignInData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInData>({
    email: '',
    password: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const { isScrolled } = useScrollContext();

  const router = useRouter();
  const dispatch = useDispatch();

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
        setIsLoading(true);

        const { isValid, message }: loginValidatorType = loginValidator(
          formData.email,
          formData.password
        );

        if (isValid) {
          const data: fullUserType = await axiosPost(
            '/api/users/login',
            formData
          );

          if (data) {
            dispatch(login(data));
            router.push('/');
            toast.success('Login success');
            setFormData({
              email: '',
              password: '',
            });
            setFormSubmitted(true);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        } else {
          message.email && toast.error(message.email);
          message.password && toast.error(message.password);
          setIsLoading(false);
        }
      });

    return () => {
      if (formSubscription.current) {
        formSubscription.current.unsubscribe();
      }
      subjectRef.complete();
    };
  }, [formData, router, dispatch, isLoading]);

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
              <h4>Welcome back!</h4>
              <p className='mb-5 text-black/30'>Please enter your deatils</p>
              <div className='mb-5 flex flex-col gap-2.5'>
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
                    name='password'
                    placeholder='enter your password'
                    id='password'
                  />
                </div>
              </div>
              <Button type='submit' size='full' isLoading={isLoading}>
                Login
              </Button>
              <p className='mt-2.5'>
                Don&apos;t have an account?{' '}
                <Link
                  className='eq font-semibold text-envy hover:text-envy/80'
                  href={'/sign-up'}
                >
                  Register
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

export default SignInPage;
