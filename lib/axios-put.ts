import { bookingType } from '@/types/booking';
import { locationType } from '@/types/location';
import { resortType } from '@/types/resort';
import { restaurantType } from '@/types/restaurant';
import { spotType } from '@/types/spot';
import { tourPackageType } from '@/types/tour-package';
import { userType } from '@/types/user';
import axios from 'axios';
import toast from 'react-hot-toast';

export const axiosPut = async (
  endpoint: string,
  data:
    | userType
    | locationType
    | restaurantType
    | resortType
    | tourPackageType
    | spotType
    | bookingType,
  token: string = ''
) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data) {
      return res.data;
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message);
  }
};
