import validator from 'email-validator';

export const validateEmail = (val) => {
  let errorText = '';
  let isError = false;
  if (val.length === 0) {
    errorText = 'Email is required.';
    isError = true;
  } else if (!validator.validate(val)) {
    errorText = 'Your email address is invalid.';
    isError = true;
  }
  return {
    isError,
    errorText,
  };
};

export const validateFileInput = file => {
  let errorText = '';
  let isError = false;
  if (!file) {
    isError = true;
    errorText = 'Picture is require.';
  } else if (file.name.indexOf('.jpg') === -1) {
    isError = true;
    errorText = 'The image must have an extension .jpg.';
  } else if (file.size > 10 * 1024 * 1024) {
    isError = true;
    errorText = 'File can not be more than 10Mb.';
  }
  return {
    isError,
    errorText,
  };
};

export const validateRequreField = (val) => {
  return !val.trim();
};

export const validatePass = (val) => {
  let errorText = '';
  let isError = false;
  if (val.length < 6) {
    errorText = 'Password can not be less 6 characters.';
    isError = true;
  }
  return {
    isError,
    errorText,
  };
};

export const validateConfirmPass = (val, compareVal) => {
  return val !== compareVal;
};