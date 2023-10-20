'use client';

import NavbarFull from '@/components/shared/navbar/navbar-full';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textare';
import { axiosPost } from '@/lib/axios-post';
import { RootState } from '@/redux/store';
import { locationType } from '@/types/location';
import {
  locationValidator,
  locationValidatorType,
} from '@/validators/location-validator';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

interface LocationData {
  name: string;
  photoUrl: string;
  description: string;
}

const CreateLocationPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LocationData>({
    name: '',
    photoUrl: '',
    description: '',
  });

  const auth = useSelector((state: RootState) => state.auth.fullUser);

  const router = useRouter();

  const handleAddLocation = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setIsLoading(true);

      const { isValid, message }: locationValidatorType = locationValidator(
        formData.name,
        formData.photoUrl,
        formData.description
      );

      if (isValid) {
        const data: locationType = await axiosPost(
          '/api/locations',
          formData,
          auth?.token
        );

        if (data) {
          router.push('/destinations');
          toast.success('New location created successfully');
          setFormData({
            name: '',
            photoUrl: '',
            description: '',
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        message.name && toast.error(message.name);
        message.photoUrl && toast.error(message.photoUrl);
        message.description && toast.error(message.description);
        setIsLoading(false);
      }
    },
    [formData, router, auth?.token]
  );

  return (
    <>
      <NavbarFull />
      <main>
        <section className='container h-[calc(100vh-5rem)] py-20'>
          <div className='flex h-full w-full items-center justify-center'>
            <form className='w-full max-w-2xl' onSubmit={handleAddLocation}>
              <h4 className='mb-5'>Add new location</h4>
              <div className='mb-5 flex flex-col gap-2.5'>
                <Input<LocationData>
                  formData={formData}
                  setFormData={setFormData}
                  label='Name'
                  name='name'
                  type='text'
                  placeholder='Saint Martin'
                />
                <Input<LocationData>
                  formData={formData}
                  setFormData={setFormData}
                  label='Photo URL'
                  name='photoUrl'
                  type='text'
                  placeholder='Paste a photo url from pexels or cloudinary'
                />
                <Textarea<LocationData>
                  formData={formData}
                  setFormData={setFormData}
                  label='Description'
                  name='description'
                  placeholder='Write location details...'
                />
                <Button type='submit' isLoading={isLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateLocationPage;
