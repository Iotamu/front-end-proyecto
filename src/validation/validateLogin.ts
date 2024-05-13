import { validateEmail, validatePassword } from "./validationFunctions";

export const validateLogin = (data: { email: string, password: string }): string[] => {
    const errors: string[] = [];
  
    if (!validateEmail(data.email)) {
      errors.push('El correo electrónico no es válido');
    }
  
    if (!validatePassword(data.password)) {
      errors.push('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula');
    }   
    return errors;
  };