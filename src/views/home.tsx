import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { RootStackParamList } from '../../Router';
import healthcheckService from '../services/healthcheck.services';
import { useEffect } from 'react';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const getHealthcheck = async () => {
      const res = await healthcheckService();
  
      if (res.status === 200) {
        navigation.navigate('Login');
      }
    };

    useEffect(() => {
      getHealthcheck();
    }, []);
  

    const onAccess = async () => {
      navigation.navigate('Login');
    }
  
    const onRegister = () => {
      navigation.navigate('Register');
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido(a)</Text>
      <Button style={styles.button} title={"Acceder"} onPress={onAccess}></Button>
      <Button style={styles.button} title={"Crear una cuenta"} onPress={onRegister}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  }
});

export default Home;