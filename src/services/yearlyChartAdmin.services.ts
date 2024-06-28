import axios from "axios"

const yearlyChartAdminServices = async (januaryFirst:string, decemberThirtyfirst:string) => {
    const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/dailyReportRange?startDate=${januaryFirst}&endDate=${decemberThirtyfirst}`
    try {
        const response = await axios.post(url)
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        console.log('Hubo un error: ', error)
        return {status: 500}
    }
}

export default yearlyChartAdminServices