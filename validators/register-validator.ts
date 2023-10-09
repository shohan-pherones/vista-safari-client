export const registerValidator = (
  email: string,
  password: string,
  photoUrl: string
) => {
  const message = {
    email: '',
    password: '',
    photoUrl: '',
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid: boolean = emailRegex.test(email);
  if (!isEmailValid) {
    message.email = 'Invalid email address';
  }

  const isPasswordValid: boolean = password.length >= 8;
  if (!isPasswordValid) {
    message.password = 'Password must be 8+ chars';
  }

  const isValidPhotoUrl: boolean =
    photoUrl.includes('') ||
    photoUrl.includes('images.pexels.com') ||
    photoUrl.includes('res.cloudinary.com');
  if (!isValidPhotoUrl) {
    message.photoUrl =
      'Please enter a valid photo URL from Cloudinary or Pexels, or leave it empty.';
  }

  if (isEmailValid && isPasswordValid && isValidPhotoUrl) {
    return { isValid: true, message };
  }

  return { isValid: false, message };
};

export type registerValidatorType = {
  isValid: boolean;
  message: {
    email: string;
    password: string;
    photoUrl: string;
  };
};
