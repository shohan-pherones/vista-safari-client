import { tourPackageType } from './tour-package';
import { userType } from './user';

export type bookingType = {
  _id: string;
  user: userType;
  tourPackage: tourPackageType;
  seats: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
