import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../component/gradient';
import { RootStackParamList } from '../../Router'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';

const ResetPassword = () => {
  const navigation =useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <Input
        placeholder="Contraseña Temporal"
        secureTextEntry
        onChangeText={setTempPassword}
        value={tempPassword}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Nueva Contraseña"
        secureTextEntry
        onChangeText={setNewPassword}
        value={newPassword}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <GradientButton
        onPress={onSubmit}
        text="Enviar"
        style={styles.button}
      />
    </View>
  );
};

export default ResetPassword;