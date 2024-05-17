import axios, {AxiosError} from "axios";
import getToken from "../validation/checkToken";

const registerScheduleService = async (userId: number, fecha: string, hora: string) => {

    const token = await getToken();
    console.log(' tokennn ')
    console.log(token)
    const payload = { userId, fecha, hora };
    const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/create/`;
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Horario registrado:', response.data);
      return response;
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
  
  export default registerScheduleService;