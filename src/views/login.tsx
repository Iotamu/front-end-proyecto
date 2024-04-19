import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../Router";
//import 'text-encoding-polyfill';
import Joi from "joi";
import useStore from "../stores/useStore";
import { useEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import loginService from "../services/login.services";

const loginSchema = Joi.object({
    user: Joi.string().min(6).max(12),
    password: Joi.string().min(4).max(8),
})

const Login = () => {
  const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUser: setUserStore } = useStore();
  const [user, setUser] = useState<string>(''); //se supervisan user y setUser
  const [errorMessageUser, setErrorMessageUser] = useState<string>('')
  const [password, setPassword] = useState<string>(''); //se supervisan password y setPassword
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>('')

  useEffect(() => {
    const errors = loginSchema.validate({user, password})
    console.log(errors?.error?.details[0]?.context?.key)
  }, [user, password])

  const onLogin = async () => {
    const payload = { user, password };
    const response = await loginService(payload)
    setUserStore(user);
    navigation.navigate('Profile');
  }

  return (
    <View style = {styles.container}>
        <Text style = {styles.title}>Inicio de sesión</Text>
        {
          //TODO link a la pantalla de registro
        }
        <Input
          label= "Email"
          placeholder= "Email de la cuenta"
          onChangeText={(value: string) => setUser(value)}
        ></Input>
        <Input
          secureTextEntry
          label= "Contraseña"
          placeholder="••••••"
          onChangeText={(value: string) => setPassword(value)}
        ></Input>
        <Button style = {styles.button}
          title="Login"
          onPress={onLogin}
        ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '10%',
      paddingVertical: '5%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
    }
  });

export default Login;