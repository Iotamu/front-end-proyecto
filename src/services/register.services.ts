import axios, { AxiosError } from 'axios';

export type RegisterServiceResponse = {
  success: boolean;
  data?: string;
  error?: string;
};

const registerService = async (
  data: Record<string, string>
): Promise<RegisterServiceResponse> => {
  try {
    const endpoint: string = `http://${process.env.EXPO_PUBLIC_MS_USER_URL}api/v1/auth/register`;

    const response = await axios.post(endpoint, data);  // realiza solicitud post 
    const responseData = response.data;         // data de la solicitud

    return {
      success: true,
      data: responseData?.message || "",
    };
  } catch (error: unknown) {      // Revisar cualquier error
    let errorMessage = 'Ha ocurrido un error en el servidor';

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

    return { success: false, error: errorMessage };
  }
};

export default registerService;