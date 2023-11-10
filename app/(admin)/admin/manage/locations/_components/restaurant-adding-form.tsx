import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { axiosPost } from '@/lib/axios-post';
import { RootState } from '@/redux/store';
import { locationType } from '@/types/location';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

interface FormData {
  name: string;
  photoUrl: string;
}

interface RestaurantAddingFormProps {
  location: locationType | null;
}

const RestaurantAddingForm: React.FC<RestaurantAddingFormProps> = ({
  location,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    photoUrl: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = useSelector((state: RootState) => state.auth.fullUser);

  const handleAddRestaurant = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const data = await axiosPost(
      `/api/locations/${location?._id}/restaurants`,
      formData,
      auth?.token
    );

    if (data) {
      setIsLoading(false);
      toast.success('Restaurant added successfully');
      setFormData({
        name: '',
        photoUrl: '',
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddRestaurant} className='w-full max-w-xl space-y-5'>
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Name'
        name='name'
        placeholder='Restaurant name'
      />
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Photo URL'
        name='photoUrl'
        placeholder='Paste restaurant photo utl'
      />
      <Button type='submit' isLoading={isLoading}>
        Add
      </Button>
    </form>
  );
};

export default RestaurantAddingForm;
