import axios from "axios"

const weeklyChartAdminServices = async (userId: number, monday: string, sunday: string) => {
    const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/workReport/getWorkReportUser`
    try {
        const response = await axios.get(url, {
            params: {
                userId: userId,
                startDate: monday,
                endDate: sunday
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