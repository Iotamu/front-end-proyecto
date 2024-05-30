import axios, { AxiosError } from "axios";

interface updatePayload {
  name: string
  lastName: string
  email: string
}

const updateService = async (id:number , payload: updatePayload) => {
  try {
    console.log(payload);
    const url = `http://${process.env.EXPO_PUBLIC_MS_USER_URL}api/v1/users/${id}`;
    const response = await axios.patch(url, payload);
    console.log(response.status);
    return response.data; 
  } catch (error: unknown) {
    let errorMessage = 'Ha ocurrido un error en el servicio';
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;    
      console.log("axiosError.response.data:", axiosError.response?.data);
      errorMessage = (axiosError.response?.data as any)?.message || 'Ha ocurrido un error desconocido';
    }
    console.error(errorMessage);  
    return { status: 500 };
  }
};

export default updateService;