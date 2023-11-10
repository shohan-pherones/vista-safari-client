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
  price: number;
  date: string;
  limit: number;
  transport: string;
}

interface TourPackageAddingFormProps {
  location: locationType | null;
}

const TourPackageAddingForm: React.FC<TourPackageAddingFormProps> = ({
  location,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: 0,
    date: '',
    limit: 0,
    transport: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = useSelector((state: RootState) => state.auth.fullUser);

  const handleAddTourPackage = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const data = await axiosPost(
      `/api/locations/${location?._id}/tour_packages`,
      formData,
      auth?.token
    );

    if (data) {
      setIsLoading(false);
      toast.success('Tour Package added successfully');
      setFormData({
        name: '',
        price: 0,
        date: '',
        limit: 0,
        transport: '',
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddTourPackage} className='w-full max-w-xl space-y-5'>
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Name'
        name='name'
        placeholder='Tour Package name'
      />
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Price'
        name='price'
        type='number'
        placeholder='0'
      />
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Date'
        name='date'
        type='date'
      />
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Seat Limit'
        name='limit'
        type='number'
      />
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Transport'
        name='transport'
        placeholder='Transport name'
      />
      <Button type='submit' isLoading={isLoading}>
        Add
      </Button>
    </form>
  );
};

export default TourPackageAddingForm;
