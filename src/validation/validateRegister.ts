import { validateName, validateLastName, validateEmail, validatePassword } from "./validationFunctions";

export const validateRegister = (data: { name: string, lastName: string, email: string, password: string }): string[] => {
    const errors: string[] = [];
  
    if (!validateName(data.name)) {
      errors.push('El nombre debe tener al menos 4 caracteres y no tener espacios o caracteres especiales.');
    }
  
    if (!validateLastName(data.lastName)) {
      errors.push('El apellido debe tener al menos 4 caracteres y no tener espacios o caracteres especiales.');
    }
  
    if (!validateEmail(data.email)) {
      errors.push('El correo electrónico no es válido.');
    }
  
    if (!validatePassword(data.password)) {
      errors.push('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula.');
    }

    return errors;
  };