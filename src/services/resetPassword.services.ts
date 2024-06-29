import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ResetPasswordPayload {
    newPassword: string;
    tempPassword: string;
}

const resetPasswordService = async (payload: ResetPasswordPayload) => {
    try {
        console.log(payload)
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('Token no encontrado');
        }
        const url = `http://${process.env.EXPO_PUBLIC_MS_USER_URL}api/v1/auth/resetPassword`
        const response = await axios.patch(url, payload);
        console.log(response.status)
        if (response && response.status === 200) {
            console.log('Contraseña restablecida exitosamente');
        } else {
            console.log('Error en la solicitud');
        }
        return response//?.status === 201 ? response?.data : {data: undefined}
    } catch (error: unknown) {
        let errorMessage = 'Ha ocurrido un error en el servicio';
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;    
            console.log("axiosError.response.data:", axiosError.response?.data);
            errorMessage = (axiosError.response?.data as any)?.message || 'Ha ocurrido un error desconocido';
            console.error(errorMessage);   
        return { status: 500 }
    }
}
}

export default resetPasswordService;