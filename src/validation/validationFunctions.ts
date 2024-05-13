export const validateName = (name: string): boolean => {
  return /^[a-zA-Z0-9ñÑ]+$/.test(name.trim()) && name.trim().length >= 4;
};

export const validateLastName = (lastName: string): boolean => {
  return /^[a-zA-Z0-9ñÑ]+$/.test(lastName.trim()) && lastName.trim().length >= 4;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\u00C0-\u017F\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password);
};