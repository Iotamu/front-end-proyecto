import axios from "axios"

interface User {
    id: number
    name: string
}

const fetchUsersServices = async (userId: number) => {
    const url = `http://${process.env.EXPO_PUBLIC_MS_USER_URL}api/v1/users/allUsers/${userId}`
    try {
        const response = await axios.get<User[]>(url)
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        console.log(error)
        return {status: 500}
    }
}

export default fetchUsersServices