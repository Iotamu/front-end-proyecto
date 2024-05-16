import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../stores/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import styles from './styles';
import registerScheduleService from '../services/registerSchedule.services';
import getToken from '../validation/checkToken';


const Profile = () => {
  const { name, lastName, userId, email,role} = useStore();
  
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressChangePassword = () => {if (navigation) {
      navigation.navigate('ResetPassword');
    }
  };

  const onPressRegisterSchedule = async () => {
    const token = await getToken();       
    console.log(token)
    try {
      const response = await registerScheduleService(5, '2024-05-17', '09:00');
      if (response.status === 201) {
        console.log('registro exitoso');
        navigation.navigate('RegisterSchedule');
      } else {
        console.log('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error :', error);
    } 
    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Accediste!
        name
      </Text>
      {/* Profile */}
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
    </View>
  );
};

export default Profile;