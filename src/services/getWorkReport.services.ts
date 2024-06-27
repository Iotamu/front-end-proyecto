import axios from 'axios';

const getWorkReport = async (startDate: string, endDate: string) => {
  console.log("Iniciando healthcheck getWeek ");
  
  const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/workReportRange`;
  console.log(url)
  try {
    console.log(" try getReportRange");
    const response = await axios.post<any[]>(url, null, {
      params: {
        startDate: startDate,
        endDate: endDate,
      }
    });
    console.log('Registros', response.data);

    return {
      status: response.status,
      data: response.data
    };

  } catch (error) {
    console.error('Error conexion ', error);
    return { status: 500 };
  }
};

export default getWorkReport;