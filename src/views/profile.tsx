import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../stores/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import styles from './styles';
import getToken from '../validation/checkToken';
import registerScheduleService from '../services/registerSchedule.services';


const Profile = () => {
  const { name, userId, email, role } = useStore();
  let isAdmin = Boolean(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if(role == "user"){//CAMBIAR CUANDO SE IMPLEMENTE EL ADMIN
    isAdmin = true
  }

  const onPressChangePassword = () => {if (navigation) {
      navigation.navigate('ResetPassword');
    }
  };

  const onPressRegisterSchedule = async () => {
    const token = await getToken();       
    const fecha = new Date().toISOString().split('T')[0];
    const hora= new Date().toISOString().split('T')[1].split('.')[0];
        try {
          if(userId!=null){
            const response = await registerScheduleService(userId, fecha, hora);
              if (response.status === 201) {
                 console.log('registro exitoso');
                 navigation.navigate('RegisterSchedule');
            } else {
                console.log('Error en la solicitud');
            }
          }
        } catch (error) {
              console.error('Error :', error);
      } 
    }

  const onPressWeekOverview = () =>{
    navigation.navigate('WeekOverview')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Perfil
      </Text>
      <Text style={styles.title}>
        Bienvenido {role} {name} 
      </Text>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressChangePassword}>
          <Text style={styles.forgot}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressRegisterSchedule}>
          <Text style={styles.forgot}>Registrar horario</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressWeekOverview}>
          <Text style={styles.forgot}>Revisar Semana</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Profile;