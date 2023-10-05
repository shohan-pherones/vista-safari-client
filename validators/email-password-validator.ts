export const emailPasswordValidator = (email: string, password: string) => {
  const message = {
    email: '',
    password: '',
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isEmailValid = emailRegex.test(email);

  if (!isEmailValid) {
    message.email = 'Invalid email address';
  }

  const isPasswordValid = password.length >= 8;

  if (!isPasswordValid) {
    message.password = 'Password must be 8+ chars';
  }

  if (isEmailValid && isPasswordValid) {
    return { isValid: true, message };
  }

  return { isValid: false, message };
};

export type emailPasswordValidatorType = {
  isValid: boolean;
  message: {
    email: string;
    password: string;
  };
};
