import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { RootStackParamList } from "../../Router";
import registerService, { RegisterServiceResponse } from "../services/register.services";
import { validateRegister } from "../validation/validateRegister";
import { GradientButton } from "../component/gradient";
import styles from "./styles";
import Joi from "joi";

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
  const [valid, setValid] = useState<Boolean>(false)
  const [errorMessageName, setErrorMessageName] = useState<string>("")
  const [errorMessageLastName, setErrorMessageLastName] = useState<string>("")
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("")
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("")

  useEffect(() => {
    const errors = registerSchema.validate({data})
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
  },[data])

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
      const response = await registerService(data)
      if(response.success){
        
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrando un nuevo usuario</Text>
      <Input
        label="Nombre"
        placeholder="Tu nombre"
        value={data.name}
        onChangeText={(text) => setValue("name", text)}
      />
      <Input
        label="Apellido"
        placeholder="Tu apellido"
        value={data.lastName}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <Input
        label="Email"
        placeholder="mail@ejemplo.com"
        value={data.email}
        onChangeText={(text) => setValue("email", text)}
      />
      <Input
        secureTextEntry
        label="Contraseña"
        placeholder="••••••"
        value={data.password}
        onChangeText={(text) => setValue("password", text)}
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