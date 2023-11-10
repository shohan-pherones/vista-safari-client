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

interface SpotAddingFormProps {
  location: locationType | null;
}

const SpotAddingForm: React.FC<SpotAddingFormProps> = ({ location }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    photoUrl: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = useSelector((state: RootState) => state.auth.fullUser);

  const handleAddSpot = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const data = await axiosPost(
      `/api/locations/${location?._id}/spots`,
      formData,
      auth?.token
    );

    if (data) {
      setIsLoading(false);
      toast.success('Spot added successfully');
      setFormData({
        name: '',
        photoUrl: '',
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddSpot} className='w-full max-w-xl space-y-5'>
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Name'
        name='name'
        placeholder='Spot name'
      />
      <Input
        formData={formData}
        setFormData={setFormData}
        label='Photo URL'
        name='photoUrl'
        placeholder='Paste spot photo utl'
      />
      <Button type='submit' isLoading={isLoading}>
        Add
      </Button>
    </form>
  );
};

export default SpotAddingForm;
