import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../stores/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import styles from './styles';
import getToken from '../validation/checkToken';
import registerScheduleService from '../services/registerSchedule.services';
import { useState } from 'react';
import localDate from '../component/localDate';

const Profile = () => {
  const { name, lastName, userId, email, role } = useStore();
  console.log(name)
  console.log(lastName)
  console.log(userId)
  console.log(email)
  console.log(role)

  const [fecha, setFecha] = useState();
  const [entradaRegistrada, setEntradaRegistrada] = useState(false);
  const [salidaRegistrada, setSalidaRegistrada] = useState(true);
  let isAdmin = Boolean(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //const currDate = new Date().toLocaleTimeString("es-CL", {
  //  timeZone: "America/Santiago",hour12: false});

  if(role == "user"){//CAMBIAR CUANDO SE IMPLEMENTE EL ADMIN
    isAdmin = true
  }

  const onPressChangePassword = () => {if (navigation) {
      navigation.navigate('ResetPassword');
    }
  };


  const onPressChangeInfoUser = async () => {
    navigation.navigate('ChangeInfoUser') ; 
  }


  const onPressRegisterScheduleE = async () => {
    const token = await getToken();    
    console.log(token)   
    const fecha = new Date().toISOString().split('T')[0];
    console.log(fecha)
    const currentDate = new Date().toLocaleDateString();
    console.log(currentDate)
    const hora= localDate
    console.log(hora)
    const tipo="entrada"
    console.log(tipo)
    console.log(userId)
        try {
          console.log("try")
          if(userId!==null){
            console.log("userId!==null")
            const response = await registerScheduleService(userId, tipo, fecha, hora);
            if (response.status === 201) {
                 console.log('Entrada registrada');
                 navigation.navigate('RegisterSchedule', { hora,tipo });
                 setSalidaRegistrada(false);
            } else {
                console.log('Entrada registrada anteriormente');
                setEntradaRegistrada(true);
            }
          }
        } catch (error) {
              console.error('Error :', error);
      } 
    }

    const onPressRegisterScheduleS = async () => {
      const token = await getToken();       
      const fecha = new Date().toISOString().split('T')[0];
      const hora=localDate
      const tipo="salida"
          try {
            if(userId!=null){
              const response = await registerScheduleService(userId, tipo, fecha, hora);
                if (response.status === 201) {
                   console.log('Salida registrada');
                   navigation.navigate('RegisterSchedule', { hora,tipo });
              } else {
                  console.log('Error en la solicitud');
                  setSalidaRegistrada(true);
              }
            }
          } catch (error) {
                console.error('Error :', error);
        } 
      }
        
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Accediste!
      </Text>
      <Text style={styles.title}>
        Bienvenido {role} {name} 
      </Text>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressChangeInfoUser}>
          <Text style={styles.forgot}>Cambiar datos </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressChangePassword}>
          <Text style={styles.forgot}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressRegisterScheduleE} disabled={entradaRegistrada}>
          <Text style={[styles.forgot, entradaRegistrada && { opacity: 0.5 }]}>Registrar entrada</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressRegisterScheduleS} disabled={salidaRegistrada}>
          <Text style={[styles.forgot, salidaRegistrada && { opacity: 0.5 }]}>Registrar salida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;