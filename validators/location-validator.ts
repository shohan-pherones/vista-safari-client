export const locationValidator = (
  name: string,
  photoUrl: string,
  description: string
) => {
  const message = {
    name: '',
    photoUrl: '',
    description: '',
  };

  const isValidName: boolean = typeof name === 'string' && name.length >= 3;
  if (!isValidName) {
    message.name = 'Please enter a valid name for location.';
  }

  const isValidPhotoUrl: boolean =
    photoUrl.includes('') ||
    photoUrl.includes('images.pexels.com') ||
    photoUrl.includes('res.cloudinary.com');
  if (!isValidPhotoUrl) {
    message.photoUrl =
      'Please enter a valid photo URL from Cloudinary or Pexels, or leave it empty.';
  }

  const isValidDescription: boolean =
    typeof description === 'string' && description.length >= 30;
  if (!isValidName) {
    message.name = 'Please enter a valid and long description.';
  }

  if (isValidName && isValidDescription && isValidPhotoUrl) {
    return { isValid: true, message };
  }

  return { isValid: false, message };
};

export type locationValidatorType = {
  isValid: boolean;
  message: {
    name: string;
    photoUrl: string;
    description: string;
  };
};
