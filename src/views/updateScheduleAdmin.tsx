import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from "react-native-elements";
import styles from './styles';
import { GradientButton } from '../component/gradient';
import locationStore from '../stores/locationStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import updateScheduleService from '../services/updateSchedule.service';
import SchedulePicker from '../component/schedulePicker';
import axios from 'axios';

const UpdateScheduleAdmin = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('');
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const { latitude, longitude } = locationStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDateChange = (text: string) => {
    setFecha(text);
  };

  const handleHourChange = (text: string) => {
    setHora(text);
  };

  const handleTypeChange = (text: string) => {
    setTipo(text);
  };

  const handleScheduleSelect = (scheduleId: string | null) => {
    setSelectedScheduleId(scheduleId);
    console.log(scheduleId);
  };

  const onClickButton = async () => {
    console.log('ID horario seleccionado:', selectedScheduleId);
    console.log('Tipo:', tipo);
    console.log('Fecha:', fecha);
    console.log('Hora:', hora);
    const fechaT= new Date(fecha)
    const currentDate = fechaT.toLocaleDateString();
    if (!selectedScheduleId) {
      console.error('Debe seleccionar un horario');
      return;
    }

    try {
      console.log(selectedScheduleId)
      const payload={ tipo: tipo, fecha:fecha, hora:hora, latitude:latitude, longitude:longitude, edit:"admin"}
      console.log(payload)
      
      const response = await updateScheduleService(Number(selectedScheduleId), payload );
      if (response.status === 201) {
        console.log('{tipo} registrada');
        navigation.navigate('RegisterScheduleMessage', { hora, tipo });
        navigation.navigate('GeoLocationViews');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onPressLocation = () => {
    navigation.navigate('GeoLocationViews');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrando horario</Text>
      <SchedulePicker onScheduleSelect={handleScheduleSelect} />
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
        label="Tipo"
        onChangeText={handleTypeChange}
        value={tipo}
        placeholder="Tipo"
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

export default UpdateScheduleAdmin;