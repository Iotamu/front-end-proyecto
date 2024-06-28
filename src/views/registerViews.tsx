import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../stores/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import styles from './styles';
import getToken from '../validation/checkToken';
import registerScheduleService from '../services/registerSchedule.services';
import localDate from '../component/localDate';
import locationStore from '../stores/locationStore';
import updateScheduleService from '../services/updateSchedule.service';

const RegisterViews = () => {
  const { name, lastName, userId, email, role } = useStore();
  const {latitude, longitude}=locationStore();

  const [fecha, setFecha] = useState();
  const [entradaRegistrada, setEntradaRegistrada] = useState(false);
  const [salidaRegistrada, setSalidaRegistrada] = useState(true);
  let isAdmin = Boolean(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPressChangePassword = () => {if (navigation) {
      navigation.navigate('ResetPassword');
    }
  };

  const onPressChangeInfoUser = async () => {
    navigation.navigate('ChangeInfoUser') ; 
  };

  const onPressRegister = async () => {
    navigation.navigate('CreateSchedulesAdmin') ; 
  };


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
    
    console.log(latitude)
    console.log(longitude)
        try {
          console.log("try")
          if(userId!==null){
            console.log("userId!==null")
            const response = await registerScheduleService(userId, tipo, fecha, hora, latitude,longitude, "admin");
            if (response.status === 201) {
                 console.log('Entrada registrada');
                 navigation.navigate('RegisterScheduleMessage', { hora,tipo });
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
  

  const onPressWeekOverview = () => {
    navigation.navigate('WeekOverview')
  }
  
  const onPressUpdate= async () => {
    const payload={latitude,longitude}
    const response = await updateScheduleService(1,payload)
    const tipo="check"
    if (response.status === 201) {
      console.log("checkk update")
      navigation.navigate('ChangeScheduleMessage', {tipo});
   }
  }

  const onPressUpdateRegister= async () => {
      navigation.navigate('UpdateScheduleAdmin');
  }


  const onPressRegisterScheduleS = async () => {
    const token = await getToken();       
    const fecha = new Date().toISOString().split('T')[0];
    const hora=localDate
    const tipo="salida"
          try {
            if(userId!=null){
              const response = await registerScheduleService(userId, tipo, fecha, hora,latitude,longitude,"admin");
                if (response.status === 201) {
                   console.log('Salida registrada');
                   navigation.navigate('RegisterScheduleMessage', { hora,tipo });
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
        Perfil
      </Text>
      <Text style={styles.title}>
        Bienvenido {role} {name} 
      </Text>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressChangeInfoUser}>
          <Text style={styles.buttonText}>Cambiar datos </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressChangePassword}>
          <Text style={styles.buttonText}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressRegister} disabled={entradaRegistrada}>
          <Text style={[styles.buttonText, entradaRegistrada && styles.buttonTextDisabled]}>Crear registro usuario</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressUpdateRegister} disabled={entradaRegistrada}>
          <Text style={[styles.buttonText, entradaRegistrada && styles.buttonTextDisabled]}>Actualizar un registro de usuario</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressWeekOverview}>
          <Text style={styles.buttonText}>Revisar Semana</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressUpdate}>
          <Text style={styles.buttonText}>ActualizarGeo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterViews;