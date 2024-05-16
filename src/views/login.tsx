import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Joi from "joi";
import useStore from "../stores/useStore";
import loginService from "../services/login.services";
import { RootStackParamList } from "../../Router";
import { GradientButton } from "../component/gradient";
import styles from "./styles";

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(30),
  password: Joi.string().min(8).max(20),
});

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setEmail: setEmailStore } = useStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessageUser, setErrorMessageUser] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");

  useEffect(() => {
    const errors = loginSchema.validate({ email, password });
    if (errors.error) {
      if (errors.error.details[0].context?.key === "email") {
        setErrorMessageUser(errors.error.details[0].message);
      } else if (errors.error.details[0].context?.key === "password") {
        setErrorMessagePassword(errors.error.details[0].message);
      }
    } else {
      setErrorMessageUser("");
      setErrorMessagePassword("");
    }
  }, [email, password]);

  const onLogin = async () => {
    const payload = { email, password };
    const response = await loginService(payload);
    if (response.status === 201) {
      setEmailStore(email);
      navigation.navigate("Profile");
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
          placeholder="••••••"
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