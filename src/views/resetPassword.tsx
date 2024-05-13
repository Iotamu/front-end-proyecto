import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../component/gradient';
import { RootStackParamList } from '../../Router'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#9900ef',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default ResetPassword;