import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { GradientButton } from '../component/gradient';
import { Input } from "react-native-elements";
import locationStore from '../stores/locationStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import registerScheduleService from '../services/registerSchedule.services';
import axios from 'axios';
import fetchUsersServices from '../services/fetchUsers.services';
import useStore from '../stores/useStore';
import { isValidDate,isValidTime } from '../validation/validateDate';

const CreateScheduleAdmin = () => {
  const [workerId, setId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('');
  const {latitude , longitude}= locationStore();
  const { userId } = useStore()
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchUsers = async () => {
    const response = await fetchUsersServices(userId)
  }

  const handleIdChange = (text:string) => {
    setId(text);
  };

  const handleDateChange = (text:string) => {
    setFecha(text);
  };

  const handleHourChange = (text:string) => {
    setHora(text);
  };

  const handleTypeChange = (text:string) => {
    setTipo(text);
  };

  const onClickButton = async () => {
    if (fecha !== "" && !isValidDate(fecha)) {
      Alert.alert('Error', 'Fecha no válida. Formato esperado: YYYY-MM-DD');
      return;
    }
  
    if (hora !== "" && !isValidTime(hora)) {
      Alert.alert('Error', 'Hora no válida. Formato esperado: HH:MM');
      return;
    }

    if (tipo !== "entrada" && tipo !== "salida" && tipo !== "") {
      Alert.alert('Error', 'El tipo solo puede ser "entrada" o "salida"');
      return;
    }
    
      console.log('ID:', workerId);
      console.log('tipo:', tipo);
      console.log('Fecha:', fecha);
      console.log('Hora:', hora);
      const numId=Number(workerId)
      const edit="create"
      try {
        const response = await registerScheduleService(numId, tipo, fecha, hora, latitude,longitude,edit);  
        if (response.status === 201) {
          console.log('{tipo} registrada');
          const horaR = hora;
          navigation.navigate('RegisterScheduleMessage', { hora,tipo });
          navigation.navigate('GeoLocationViews')
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  const onPressLocation = () =>{
    navigation.navigate('GeoLocationViews')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrando horario</Text>
      <Input
        label=" userID"
        value={workerId}
        onChangeText={handleIdChange}
        keyboardType="numeric"
      />
      <Input
        label="Fecha (YYYY-MM-DD)"
        onChangeText={handleDateChange}
        value={fecha}
        placeholder="YYYY-MM-DD"
      />
      <Input
        label="Hora (HH:MM)"
        onChangeText={handleHourChange}
        value={hora}
        placeholder="HH:MM"
      />
      <Input
        label="tipo"
        onChangeText={handleTypeChange}
        value={tipo}
        placeholder="tipo"
      />
      <View style={[styles.button, styles.registerButton]}>
        <TouchableOpacity onPress={onPressLocation}>
          <Text style={styles.buttonText}>GeoLocalización</Text>
        </TouchableOpacity>
      </View>
      <GradientButton
        onPress={onClickButton}
        text="Registrar"
        style={styles.button}
      />
    </View>
  );
};

export default CreateScheduleAdmin;