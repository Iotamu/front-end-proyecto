import axios, { AxiosError } from "axios";
import getToken from "../validation/checkToken";

const registerScheduleService = async (userId: number, tipo: string, fecha: string, hora: string, latitude:string, longitude:string, edit:string) => {
  try {
    const token = await getToken();
    console.log('Token obtenido:', token);
    const payload = { userId, tipo, fecha, hora ,latitude ,longitude,edit};
    console.log(payload)
    const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/create`;
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response");
    console.log(response);
    console.log('Horario registrado:', response.data);
    return response;
  } catch (error: unknown) {
    let errorMessage = 'Ha ocurrido un error en el servicio';
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error("Error de Axios:", axiosError);
      console.log("axiosError.response.data:", axiosError.response?.data);
      errorMessage;
    } else {
      console.error("Error desconocido:", error);
    }
    console.error(errorMessage);
    return { status: 500 }; 
  }
};

export default registerScheduleService;