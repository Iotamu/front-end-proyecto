import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../stores/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import styles from './styles';


const RegisterSchedule = () => {
  const { name } = useStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Accediste!
      </Text>
      <Text style={styles.title}>
        REGISTRASTE UN HORARIO
      </Text>
    </View>
  );
};


export default RegisterSchedule;