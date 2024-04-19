import axios from "axios"

export type RegisterServiceResponse = {
    success: boolean
    data?: string
    error?: string
}

const registerService = async (data: string): Promise<RegisterServiceResponse> => {
    console.log("llamado al servicio de registro")
    /*
    let config = {
        method: 'post',
        maxBodyLenght: Infinity,
        url: 'localhost:3000/api/v1/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };
    
    try {
        const response = await axios.request(config)
        console.log(JSON.stringify(response.data))
    } catch (error) {
        console.log(error)
    }
    */
    try {
        const endpoint: string = `localhost:3000/api/v1/auth/register/`
        return {
            success: true,
            data: (await axios.post(endpoint, data))?.data?.message,
        }
    } catch (e: unknown) {
        let error = "Error al registrar"
        console.log(error);
        switch (
            (e as Record<string,Record<string,Record<string, unknown>>>)?.response?.data?.message
        ) {
            case 'User already exists':
                error = 'El email ya está en uso'
                console.log(error);
                break
        }
        return {
            success: false,
            error
        }
    }
}

export default registerService
