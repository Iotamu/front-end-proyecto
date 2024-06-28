import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '@/Router';

async function calculateHoursService(id: number): Promise<void> {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  try {
    console.log("calculateHourss")
    const url = `http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/calculateHours/${id}`;
    const response = await axios.post(url);

    if (response.status === 200) {
      console.log('Horas calculadas exitosamente');
    } else {
      navigation.navigate("ProfileUser");

    }
  } catch (error) {
    console.error('Error al calcular las horas:', error);
    throw new Error('No se pudieron calcular las horas.');
  }
}

export default calculateHoursService;