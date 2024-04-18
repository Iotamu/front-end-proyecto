import axios from "axios"

export type RegisterServiceResponse = {
    success: boolean
    data?: string
    error?: string
}

const registerService = async (
    data: Record<string,string>
): Promise<RegisterServiceResponse> => {
    try {
        const endpoint: string = `${process.env.EXPO_PUBLIC_MS_USER_URL}/auth/register`
        return {
            success: true,
            data: (await axios.post(endpoint, data))?.data?.message,
        }
    } catch (e: unknown) {
        let error = "Error al registrar"
        //TODO determinar error
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