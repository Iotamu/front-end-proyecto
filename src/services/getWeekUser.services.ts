import axios from 'axios';

const getWeekUser = async (userId: number, fecha1: string, fecha2: string) => {
  console.log("Iniciando healthcheck getWeek ");
  const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/user/range`;

  try {
    console.log(" try getWeek");
    const response = await axios.get<any[]>(url, {
      params: {
        userId: userId, 
        fecha1: fecha1,
        fecha2: fecha2
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

export default getWeekUser;