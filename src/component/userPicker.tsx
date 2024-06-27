import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../views/styles';
import axios from 'axios';
import useStore from '../stores/useStore';

interface User {
  id: number;
  name: string;
}


const UserPicker = () => {
  const {role } = useStore();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`http://${process.env.EXPO_PUBLIC_MS_USER_URL}api/v1/users/allUsers/${role}`); 
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); 
  }, []); 

  const handleChange = (value: string) => {
    setSelectedUser(value); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Elige un usuario:</Text>
      <RNPickerSelect
        onValueChange={handleChange}
        items={users.map(user => ({
          label: `Usuario ${user.id} ${user.name}`,
          value: user.id.toString(),
        }))}
        style={{
            inputIOS: {
                fontSize:16,
            },
            inputAndroid: {
                fontSize:16,},
        }}
      />
    </View>
  );
};


export default UserPicker;