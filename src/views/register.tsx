import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { RootStackParamList } from "../../Router";
import registerService, { RegisterServiceResponse } from "../services/register.services";
import { validateRegister } from "../validation/validateRegister";
import { GradientButton } from "../component/gradient";

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

const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<Form>(FormSheet);

  const setValue = (key: keyof Form, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onClickRegisterButton = async () => {
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#9900ef",
  },
  button: {
    marginTop: 20,
  },
});

export default Register;