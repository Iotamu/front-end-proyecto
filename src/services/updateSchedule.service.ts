import axios, { AxiosError } from "axios";

interface updatePayload {
  latitude: string
  longitude: string
}

const updateScheduleService = async (userId:number , payload: updatePayload) => {
  try {
    console.log(payload);
    const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/location/${userId}`;
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

export default updateScheduleService;