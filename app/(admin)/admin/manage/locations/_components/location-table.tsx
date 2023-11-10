'use client';

import Error from '@/components/shared/error';
import Loading from '@/components/shared/loading';
import Button from '@/components/ui/button';
import HorizontalTab from '@/components/ui/horizontal-tab';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textare';
import useFetch from '@/hooks/useFetch';
import { axiosDelete } from '@/lib/axios-delete';
import { axiosPut } from '@/lib/axios-put';
import { RootState } from '@/redux/store';
import { locationType } from '@/types/location';
import {
  locationValidator,
  locationValidatorType,
} from '@/validators/location-validator';
import { X } from 'lucide-react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { LocationData } from '../../../create/locations/page';
import ResortAddingForm from './resort-adding-form';
import RestaurantAddingForm from './restaurant-adding-form';
import SpotAddingForm from './spot-adding-form';
import TourPackageAddingForm from './tour_package-adding-form';

interface UpdatedLocationData extends LocationData {
  id: string | undefined;
}

const LocationTable = () => {
  const auth = useSelector((state: RootState) => state.auth.fullUser);

  const [shouldLocationUpdateModalOpen, setShouldLocationUpdateModalOpen] =
    useState<boolean>(false);
  const [shouldLocationDeleteModalOpen, setShouldLocationDeleteModalOpen] =
    useState<boolean>(false);
  const [shouldAddItemsModalOpen, setShouldAddItemsModalOpen] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<UpdatedLocationData>({
    id: '',
    name: '',
    photoUrl: '',
    description: '',
  });
  const [isLocationUpdateLoading, setIsLocationUpdateLoading] =
    useState<boolean>(false);
  const [isLocationDeleteLoading, setIsLocationDeleteLoading] =
    useState<boolean>(false);
  const [containerFormDeleteLocation, setContainerFormDeleteLocation] =
    useState<locationType | null>(null);
  const [locationDataForAddModal, setlocationDataForAddModal] =
    useState<locationType | null>(null);

  const {
    data: locations,
    isLoading,
    error,
  } = useFetch('/api/locations', auth?.token);

  const handleLocationUpdate = useCallback(async (location: locationType) => {
    if (!location) {
      return null;
    }

    setFormData({
      id: location._id,
      name: location.name,
      photoUrl: location.photoUrl,
      description: location.description,
    });

    setShouldLocationUpdateModalOpen(true);
  }, []);

  const handleLocationDelete = useCallback(async (location: locationType) => {
    if (!location) {
      return null;
    }

    setContainerFormDeleteLocation(location);

    setShouldLocationDeleteModalOpen(true);
  }, []);

  const onLocationDataUpdate = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setIsLocationUpdateLoading(true);

      const { isValid, message }: locationValidatorType = locationValidator(
        formData.name,
        formData.photoUrl,
        formData.description
      );

      if (isValid) {
        const data: locationType = await axiosPut(
          `/api/locations/${formData.id}`,
          formData,
          auth?.token
        );

        if (data) {
          toast.success('Location updated successfully');
          setIsLocationUpdateLoading(false);
          setShouldLocationUpdateModalOpen(false);
        } else {
          setIsLocationUpdateLoading(false);
        }
      } else {
        message.name && toast.error(message.name);
        message.photoUrl && toast.error(message.photoUrl);
        message.description && toast.error(message.description);
        setIsLocationUpdateLoading(false);
      }
    },
    [formData, auth?.token]
  );

  const onLocationDelete = useCallback(async () => {
    setIsLocationDeleteLoading(true);

    const data: locationType = await axiosDelete(
      `/api/locations/${containerFormDeleteLocation?._id}`,
      auth?.token
    );

    if (data) {
      toast.success('Location deleted successfully');
      setShouldLocationDeleteModalOpen(false);
      setIsLocationDeleteLoading(false);
    } else {
      setShouldLocationDeleteModalOpen(false);
      setIsLocationDeleteLoading(false);
    }
  }, [auth?.token, containerFormDeleteLocation?._id]);

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}

      {error && <Error error={error.message} />}

      {locations && locations.length > 0 && (
        <table className='min-w-full text-left'>
          <thead className='border-b font-medium uppercase'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                Location Name
              </th>
              <th scope='col' className='px-6 py-4'>
                Resorts
              </th>
              <th scope='col' className='px-6 py-4'>
                Spots
              </th>
              <th scope='col' className='px-6 py-4'>
                Restaurants
              </th>
              <th scope='col' className='px-6 py-4'>
                Tour Packages
              </th>
              <th scope='col' className='px-6 py-4'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location: locationType) => (
              <tr className='border-b' key={location._id}>
                <td className='whitespace-nowrap px-6 py-4'>{location.name}</td>
                <td className='whitespace-nowrap px-6 py-4'>
                  {location.resorts?.length}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  {location.spots?.length}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  {location.restaurants?.length}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  {location.tourPackages?.length}
                </td>
                <td className='flex items-center gap-2.5 whitespace-nowrap px-6 py-4'>
                  <Button onClick={() => handleLocationUpdate(location)}>
                    Update
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => handleLocationDelete(location)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      setShouldAddItemsModalOpen(true);
                      setlocationDataForAddModal(location);
                    }}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {shouldLocationUpdateModalOpen && (
        <div className='absolute left-1/2 top-1/2 z-[1] w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-10 shadow-2xl lg:w-1/2'>
          <div
            onClick={() => setShouldLocationUpdateModalOpen(false)}
            className='eq absolute right-7 top-7 z-[2] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border hover:bg-white hover:shadow-xl'
          >
            <X />
          </div>
          <form className='w-full' onSubmit={onLocationDataUpdate}>
            <h4 className='mb-5'>Update location</h4>
            <div className='mb-5 flex flex-col gap-2.5'>
              <Input<UpdatedLocationData>
                formData={formData}
                setFormData={setFormData}
                label='Name'
                name='name'
                type='text'
                placeholder='Saint Martin'
              />
              <Input<UpdatedLocationData>
                formData={formData}
                setFormData={setFormData}
                label='Photo URL'
                name='photoUrl'
                type='text'
                placeholder='Paste a photo url from pexels or cloudinary'
              />
              <Textarea<UpdatedLocationData>
                formData={formData}
                setFormData={setFormData}
                label='Description'
                name='description'
                placeholder='Write location details...'
              />
              <Button type='submit' isLoading={isLocationUpdateLoading}>
                Update
              </Button>
            </div>
          </form>
        </div>
      )}

      {shouldLocationDeleteModalOpen && (
        <div className='absolute left-1/2 top-1/2 z-[1] w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-10 shadow-2xl lg:w-1/2'>
          <h4 className='mb-5'>Delete confirmation</h4>
          <p>
            Are you sure you want to delete {containerFormDeleteLocation?.name}?
            This cannot be undone.
          </p>
          <div className='mt-5 flex items-center justify-end gap-2.5'>
            <Button
              variant='secondary'
              onClick={() => setShouldLocationDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='danger'
              isLoading={isLocationDeleteLoading}
              onClick={onLocationDelete}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

      {shouldAddItemsModalOpen && (
        <div className='absolute left-1/2 top-1/2 z-[1] w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-10 shadow-2xl lg:w-1/2'>
          <div
            onClick={() => setShouldAddItemsModalOpen(false)}
            className='eq absolute right-7 top-7 z-[2] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border hover:bg-white hover:shadow-xl'
          >
            <X />
          </div>

          <div className='space-y-10'>
            <h4>Add items to this location</h4>
            <HorizontalTab
              tabs={['Resort', 'Spot', 'Restaurant', 'Tour Package']}
            >
              <ResortAddingForm location={locationDataForAddModal} />
              <SpotAddingForm location={locationDataForAddModal} />
              <RestaurantAddingForm location={locationDataForAddModal} />
              <TourPackageAddingForm location={locationDataForAddModal} />
            </HorizontalTab>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationTable;
