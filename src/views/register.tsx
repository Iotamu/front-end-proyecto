import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import { RootStackParamList } from "../../Router";
import registerService from "../services/register.services";
import { GradientButton } from "../component/gradient";
import styles from "./styles";
import Joi from "joi";
import { Alert } from "react-native";

type Form = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

const FormSheet: Form = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};

const registerSchema = Joi.object({
  name: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).max(20)
})

const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<Form>(FormSheet);
  const [name, setName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [valid, setValid] = useState<Boolean>(false)
  const [errorMessageName, setErrorMessageName] = useState<string>("")
  const [errorMessageLastName, setErrorMessageLastName] = useState<string>("")
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("")
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("")

  useEffect(() => {
    const errors = registerSchema.validate({name, lastName, email, password})
    if (errors.error) {
      if (errors.error.details[0].context?.key === "name"){
        setErrorMessageName(errors.error.details[0].message)
        setValid(false)
      }else{
        setErrorMessageName("")
      }
      if (errors.error.details[0].context?.key === "lastName"){
        setErrorMessageLastName(errors.error.details[0].message)
        setValid(false)
      }else{
        setErrorMessageLastName("")
      }
      if (errors.error.details[0].context?.key === "email"){
        setErrorMessageEmail(errors.error.details[0].message)
        setValid(false)
      }else{
        setErrorMessageEmail("")
      }
      if (errors.error.details[0].context?.key === "password"){
        setErrorMessagePassword(errors.error.details[0].message)
        setValid(false)
      }else{
        setErrorMessagePassword("")
      }
    }else{
      setValid(true)
      setErrorMessageName("")
      setErrorMessageLastName("")
      setErrorMessageEmail("")
      setErrorMessagePassword("")
    }
  },[name, lastName, email, password])

  const setValue = (key: keyof Form, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onClickRegisterButton = async () => {
    /*
    const validationErrors = validateRegister(data);

    if (validationErrors.length === 0) {
      const payload = { ...data };

      const response: RegisterServiceResponse = await registerService(payload);

      if (response.success) {
        setData(FormSheet);
        navigation.navigate("Login");
      } else {
      }
    } else {
      Alert.alert("Error", validationErrors.join("\n"));
    }
    */
    if(valid){
      const payload = {name, lastName, email, password} 
      const response = await registerService(payload)
      
      Alert.alert('Usuario registrado')
      
      if(response.status === 201){
        console.log("Registro exitoso, nuevo usuario agregado")
        navigation.navigate("Login");
      }else{
        console.log("Error en el registro:")
        console.log(JSON.stringify(response.data.message))
      }
    }else{
      console.log("No es válido")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrando un nuevo usuario</Text>
      <Input
        label="Nombre"
        placeholder="Tu nombre"
        /*value={data.name}
        onChangeText={(text) => setValue("name", text)}*/
        onChangeText={(value: string) => setName(value)}
        errorMessage={errorMessageName}
        
      />
      <Input
        label="Apellido"
        placeholder="Tu apellido"
        /*value={data.lastName}
        onChangeText={(text) => setValue("lastName", text)}*/
        onChangeText={(value: string) => setLastName(value)}
        errorMessage={errorMessageLastName}
      />
      <Input
        label="Email"
        placeholder="mail@ejemplo.com"
        /*value={data.email}
        onChangeText={(text) => setValue("email", text)}*/
        onChangeText={(value: string) => setEmail(value)}
        errorMessage={errorMessageEmail}
      />
      <Input
        secureTextEntry
        label="Contraseña"
        placeholder="••••••••"
        /*value={data.password}
        onChangeText={(text) => setValue("password", text)}*/
        onChangeText={(value: string) => setPassword(value)}
        errorMessage={errorMessagePassword}
      />
      <GradientButton
        onPress={onClickRegisterButton}
        text="Registrar Nueva Cuenta"
        style={styles.button}
      />
    </View>
  );
};


export default Register;