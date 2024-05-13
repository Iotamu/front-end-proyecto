import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../component/gradient';
import requestService from '../services/request.services';
import Loading from './loading';
import { RootStackParamList } from '@/Router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const RequestPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    console.log('Solicitando cambio de contraseña...');
    try {
      const response = await requestService({ email });
      if (response.status === 200) {
        console.log('Requerimiento exitoso');
      } else {
        console.log('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error :', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer contraseña</Text>
      <Input
        placeholder="Correo Electrónico"
        onChangeText={setEmail}
        value={email}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <GradientButton
        onPress={onSubmit}
        text="Enviar"
        style={styles.button}
      />
      {loading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#9900ef",
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default RequestPassword;