import axios, { AxiosError } from "axios";

const resetService = async (payload: {email: string}) => {
    try {
        console.log(payload)
        const url = "http://192.168.1.92:3000/api/v1/auth/reset"
        const response = await axios.patch(`${url}`, payload);
        console.log(response.status)
        return response//?.status === 201 ? response?.data : {data: undefined}
    } catch (error: unknown) {
        let errorMessage = 'Ha ocurrido un error en el servicio';
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;    
            console.log("axiosError.response.data:", axiosError.response?.data);
            errorMessage = (axiosError.response?.data as any)?.message || 'Ha ocurrido un error desconocido';
      
        console.error(errorMessage);    //imprimir error en terminal
        }
        return { status: 500 }
    }
}

export default resetService