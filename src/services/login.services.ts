import axios from "axios";

const loginService = async (payload: {email: string; password: string}) => {
    try {
        console.log(payload)
        const url = "http://192.168.1.98:3000/api/v1/"
        const response = await axios.post(`${url}auth/login`, payload);
        console.log(response.status)
        return response//?.status === 201 ? response?.data : {data: undefined}
    } catch (error: unknown) {
        console.log(error)
        return { status: 500 }
    }
}

export default loginService