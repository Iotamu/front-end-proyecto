import axios, { AxiosError } from "axios";

const loginService = async (payload: {email: string; password: string}) => {
    try {
        console.log(payload)
        const url = "http://192.168.1.92:3000/api/v1/auth/login"
        const response = await axios.post(`${url}`, payload);
        console.log(response.status)
        return response//?.status === 201 ? response?.data : {data: undefined}
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