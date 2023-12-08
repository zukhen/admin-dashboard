const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const phoneNumberRegex = /^0[0-9]{9}$/
export const validateUsername = (value: string): boolean => {
  return !value.trim() || !emailRegex.test(value);
};

export const validatePassword = (value: string): boolean => {
  return !value.trim() || value.length < 8;
};

export const validateFirstName = (value: string): boolean => {
  return !value.trim();
};

export const validateLastName = (value: string): boolean => {
  return !value.trim();
};



export const validateMobileNumber = (value: string): boolean => {
  return !value.trim();
};

export const validateRePassword = (password: string, rePassword: string): boolean => {
  return password !== rePassword;
};
export const validateFullName = (str: string) => !str.trim()
export const validatePhoneNumber = (str: string) => phoneNumberRegex.test(str)

export const validateIsNumber = /^\d+$/
export const validateProductName = (str: string) => !str.trim()
export const validateProductDescription = (str: string) => !str.trim()
export const validateProductIsNumber = (str: number) => !isNaN(str)