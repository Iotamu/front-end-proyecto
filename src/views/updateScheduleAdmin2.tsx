import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Input } from "react-native-elements";
import styles from './styles';
import { useEffect } from 'react';
import { GradientButton } from '../component/gradient';
import locationStore from '../stores/locationStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import updateScheduleService from '../services/updateSchedule.service';
import SchedulePicker from '../component/schedulePicker';
import { isValidDate, isValidTime } from '../validation/validateDate';
import ProfileAdmin from './profileAdmin';
import GeoLocationViews from './geoLocationViews';
import GeoLocation from '../component/geoLocation';

const UpdateScheduleAdmin = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('');
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const { latitude, longitude } = locationStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  GeoLocation()

  const handleDateChange = (text: string) => {
    setFecha(text);
  };

  const handleHourChange = (text: string) => {
    setHora(text);
  };

  const handleTypeChange = (text: string) => {
    const lower= text.toLowerCase()
    setTipo(lower);
  };

  const handleScheduleSelect = (scheduleId: string | null) => {
    setSelectedScheduleId(scheduleId);
    console.log(scheduleId);
  };

  const onClickButton = async () => {

    if (!selectedScheduleId) {
      Alert.alert('Error', 'Debe seleccionar un horario');
      return;
    }

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

    const payload: any = {};
    if (tipo !== "") payload.tipo = tipo;
    if (fecha !== "") payload.fecha = fecha;
    if (hora !== "") payload.hora = hora;
    payload.latitude = latitude;
    payload.longitude = longitude;
    payload.edit = "admin";
    console.log(payload);
    if (tipo=== "" && hora==="" && fecha==="" && latitude==="" && longitude==="") {
      Alert.alert('Error', 'No ha realizado ningún cambio');
      return;
    }
    try {
      const response = await updateScheduleService(Number(selectedScheduleId), payload);
      if (response.status === 200) {
        Alert.alert('Registro actualizado');
        navigation.navigate('ProfileAdmin')
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
        label="Tipo (entrada/salida)"
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
        text="Actualizar"
        style={styles.button}
      />
    </View>
  );
};

export default UpdateScheduleAdmin;