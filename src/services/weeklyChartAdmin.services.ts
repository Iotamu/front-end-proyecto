import axios from "axios"

const weeklyChartAdminServices = async (userId: number, monday: string) => {
    const url = "no la tengo aun"
    try {
        const response = await axios.get(url, {
            params: {
                userId: userId,
                fecha: monday
            }
        })
        console.log(response.data)
        return {
            status: response.status,
            data: response.data
        }
    }catch (error) {
        console.error('Ocurrió un error: ', error)
        return {status: 500}
    }
}

export default weeklyChartAdminServices