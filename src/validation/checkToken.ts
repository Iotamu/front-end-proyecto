import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('Token:', token);
      return token;
    } else {
      console.log('No se ha encontrado ningún token en AsyncStorage');
      return null;
    }
}
export default getToken