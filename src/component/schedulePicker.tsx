import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../views/styles';
import axios from 'axios';
import stylesPicker from './stylesPicker';
import useStore from '../stores/useStore';

interface Schedule {
  id: number;
}

interface SchedulePickerProps {
    onScheduleSelect: (id: string | null) => void;
  }
  
function SchedulePicker({ onScheduleSelect }: SchedulePickerProps) {
  const [users, setUsers] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<Schedule[]>(`http://${process.env.EXPO_PUBLIC_MS_SCHEDULE_URL}api/v1/schedule/`); 
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    fetchUsers(); 
  }, []); 

  const handleChange = (value: string) => {
    setSelectedSchedule(value); 
    onScheduleSelect(value);
  };

  return (
    <View style={stylesPicker.container}>
      <Text style={styles.buttonText}>Seleccione un registro:</Text>
      <RNPickerSelect
        onValueChange={handleChange}
        items={users.map(schedule => ({
          label: `Registro ${schedule.id} `,
          value: schedule.id.toString(),
        }))}
        style={{
            inputIOS: {
                fontSize:20,
            },
            inputAndroid: {
                fontSize:20,
              },

        }}
      />
    </View>
  );
};

export default SchedulePicker;