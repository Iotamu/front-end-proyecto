import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../Router";
//import 'text-encoding-polyfill';
import Joi from "joi";
import useStore from "../stores/useStore";
import { useState } from "react";
import { Button, Input } from "react-native-elements";
/*
const loginSchema = Joi.object({
    user: Joi.string().min(6).max(12),
    password: Joi.string().min(4).max(8),
})
*/
const Login = () => {
  const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUser: setUserStore } = useStore();
  const [user, setUser] = useState<string>(''); //se supervisan user y setUser
  //TODO revisar error en el usuario con Joi
  const [password, setPassword] = useState<string>(''); //se supervisan password y setPassword
  //TODO revisar error en la contraseña con Joi

  const onLogin = async () => {
    const payload = { user, password };
    setUserStore(user);
    navigation.navigate('Profile');

  }

  return (
    <View style = {styles.container}>
        <Text style = {styles.title}>Vamos a acceder!</Text>
        <Input
          label= "Usuario"
          placeholder= "Nombre de usuario"
          onChangeText={(value: string) => setUser(value)}
        ></Input>
        <Input
          secureTextEntry
          label= "Contraseña"
          placeholder="••••••••"
          onChangeText={(value: string) => setPassword(value)}
        ></Input>
        <Button
          title="Login"
          onPress={onLogin}
        ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '10%',
      paddingVertical: '5%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingHorizontal: '10%',
      paddingVertical: '5%',
    }
  });

export default Login;