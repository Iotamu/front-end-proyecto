import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginService = async (payload: {email: string; password: string}) => {
  const url = `http://${process.env.EXPO_PUBLIC_MS_USER_URL}api/v1/auth/login`
  try {
    const response = await axios.post(url,payload)
    //console.log(JSON.stringify(response.data))
    //console.log(JSON.stringify(response.data.payload.name))
    await AsyncStorage.setItem('token', response.data.token ); 
    console.log('save token storage')
    return response
  } catch (error: unknown) {
    let errorMessage = 'Ha ocurrido un error en el servicio';
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;    
      console.log("axiosError.response.data:", axiosError.response?.data);
      errorMessage = (axiosError.response?.data as any)?.message || 'Ha ocurrido un error desconocido';
    }
    console.error(errorMessage);    

    return { data: null, status: 500 }
  }
}

export default loginService