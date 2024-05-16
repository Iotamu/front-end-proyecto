import axios, { AxiosError } from "axios";

const loginService = async (payload: {email: string; password: string}) => {
  const url = `http://${process.env.EXPO_PUBLIC_MS_USER_URL}api/v1/auth/login`
  try {
    const response = await axios.post(url,payload)
    console.log(JSON.stringify(response))
    return response
  } catch (error: unknown) {
    let errorMessage = 'Ha ocurrido un error en el servicio';
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;    
      console.log("axiosError.response.data:", axiosError.response?.data);
      errorMessage = (axiosError.response?.data as any)?.message || 'Ha ocurrido un error desconocido';

      //revisar entrada duplicada
      switch ((axiosError.response?.data as any)?.message) {
        case 'Entrada duplicada':
          errorMessage = 'El email ya está en uso';
          break;
      }
    }
    console.error(errorMessage);    

    return { status: 500 }
  }
}

export default loginService