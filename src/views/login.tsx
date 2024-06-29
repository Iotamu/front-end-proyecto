import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Joi, { number } from "joi";
import useStore from "../stores/useStore";
import loginService from "../services/login.services";
import { RootStackParamList } from "../../Router";
import { GradientButton } from "../component/gradient";
import styles from "./styles";
import calculateHoursService from "../services/calculateHours.services";
import { validateEmail } from "../validation/validationFunctions";
import { Alert } from "react-native";

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string(),
});

const Login = () => {
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUserId: setUserIdStore } = useStore()
  const { setName: setNameStore } = useStore()
  const { setLastName: setlastNameStore } = useStore()
  const { setEmail: setEmailStore } = useStore();
  const { setRole: setRoleStore } = useStore()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessageUser, setErrorMessageUser] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");

  useEffect(() => {
    const errors = loginSchema.validate({ email, password });
    if (errors.error) {
      if (errors.error.details[0].context?.key === "email") {
        setErrorMessageUser(errors.error.details[0].message);
      } else {
        setErrorMessageUser("");
      }
      if (errors.error.details[0].context?.key === "password") {
        setErrorMessagePassword(errors.error.details[0].message);
      } else {
        setErrorMessagePassword("");
      }
    } else {
      setErrorMessageUser("");
      setErrorMessagePassword("");
    }
  }, [email, password]);

  const onLogin = async () => {
    if(email===""){
      Alert.alert('El email no puede estar vacío')
      return
    }
    if(!validateEmail(email)){
       Alert.alert('El email no tiene formato valido')
       return
    }
    if(password===""){
      Alert.alert('La contraseña no puede estar vacía')
    }


    const payload = { email, password };
    const response = await loginService(payload);
    if (response.status === 201/* && response.data*/) {
      setUserIdStore(response.data.userId)
      setNameStore(response.data.name)
      setlastNameStore(response.data.lastName)
      setEmailStore(response.data.email)
      setRoleStore(response.data.role)
      if(response.data.role==="user"){
        navigation.navigate("ProfileUser");
      }
      else{
        navigation.navigate("ProfileAdmin")
      }
    }
    else{
      Alert.alert('Error al ingresar credenciales')
      
    }
  };

  const onPressForgotPassword = () => {
    navigation.navigate("RequestPassword");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>
      <View style={styles.inputContainer}>
        <Input
          label="Email"
          placeholder="Email de la cuenta"
          onChangeText={(value: string) => setEmail(value)}
          errorMessage={errorMessageUser}
        />
        <Input
          secureTextEntry
          label="Contraseña"
          placeholder="••••••••"
          onChangeText={(value: string) => setPassword(value)}
          errorMessage={errorMessagePassword}
        />
      </View>
      <GradientButton onPress={onLogin} text="Login" style={styles.button} />
      <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgot}>Recuperar contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Login;