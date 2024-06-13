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
import { ModalComponent } from '../component/modalComponent';

const ProfileUser = () => {
  const { name, lastName, userId, email, role } = useStore();
  console.log(name)
  console.log(lastName)
  console.log(userId)
  console.log(email)
  console.log(role)

  const [fecha, setFecha] = useState();
  const [entradaRegistrada, setEntradaRegistrada] = useState(false);
  const [salidaRegistrada, setSalidaRegistrada] = useState(true);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //const currDate = new Date().toLocaleTimeString("es-CL", {
  //  timeZone: "America/Santiago",hour12: false});

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
    const hora= new Date().toLocaleTimeString("es-CL", {timeZone: "America/Santiago",hour12: false});
    console.log(hora)
    const tipo="entrada"
    console.log(tipo)
    console.log(userId)
        try {
          console.log("try")
          if(userId!==null){
            console.log("userId!==null")
            console.log("fecha")
            console.log(fecha)
            console.log("hora")
            console.log(hora)
            const response = await registerScheduleService(userId, tipo, fecha, hora);
            if (response.status === 201) {
                 console.log('Entrada registrada');
                 const horaR = hora;
                 navigation.navigate('RegisterScheduleMessage', { hora,tipo });
                 setSalidaRegistrada(false);
            } else {
                console.log('Entrada registrada anteriormente');
                setEntradaRegistrada(true);
                setError(`Entrada registrada anteriormente`);
                setModalVisible(true);
            }
          }
        } catch (error) {
              console.error('Error :', error);
      } 
    }

  const onPressWeekOverview = () =>{
    navigation.navigate('WeekOverview')
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
                   navigation.navigate('RegisterScheduleMessage', { hora,tipo });
              } else {
                  console.log('Salida registrada anteriormente solicitud');
                  setSalidaRegistrada(true);
                  setError(`Entrada registrada anteriormente`);
                  setModalVisible(true);
                  
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
      <ModalComponent
        modalVisible={modalVisible}
        headerTitle="Error"
        buttonTitle="Cerrar"
        onClose={() => setModalVisible(false)}
        onAction={() => setModalVisible(false)}
      >
        <Text style={styles.text}>{error}</Text>
      </ModalComponent>
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
        <TouchableOpacity onPress={onPressRegisterScheduleE} disabled={entradaRegistrada}>
          <Text style={[styles.buttonText, entradaRegistrada && styles.buttonTextDisabled]}>Registrar entrada</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressRegisterScheduleS} disabled={salidaRegistrada}>
          <Text style={[styles.buttonText, salidaRegistrada && styles.buttonTextDisabled]}>Registrar salida</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressWeekOverview}>
          <Text style={styles.buttonText}>Revisar Semana</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileUser;