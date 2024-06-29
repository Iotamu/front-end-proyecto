import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../component/gradient';
import { RootStackParamList } from '../../Router'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import { Alert } from 'react-native';
import resetPasswordService from '../services/resetPassword.services';

const ResetPassword = () => {
  const navigation =useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = async () => {
    if (tempPassword==="") {
      Alert.alert('Ingrese la contraseña temporal');
    }
    if (newPassword==="") {
      Alert.alert('Ingrese la nueva contraseña');
    }
    setLoading(true);
    setDisabled(true);
    console.log('Solicitando cambio de contraseña...');
    console.log(newPassword)
    console.log(tempPassword)
    try {
      const response = await resetPasswordService({ tempPassword, newPassword });
      if(response?.status===200){
        Alert.alert('Su clave ha sido actualizada correctamente');
        navigation.navigate('Login')
      }
      else {
        console.log('Error en la solicitud');
        Alert.alert('Error al actualizar, verifique los datos');
      }
    } 
    catch (error) {
      Alert.alert('Error al actualizar, verifique los datos');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 200); 
    }
   }  

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
}

export default ResetPassword;