import axios, { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input } from "react-native-elements";
import { RootStackParamList } from "../../Router";
import updateService from "../services/update.services";
import { GradientButton } from "../component/gradient";
import styles from "./styles";
import useStore from "../stores/useStore";

interface updatePayload {
  name: string;
  lastName: string;
  email: string;
}

const ChangeInfoUser = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { name: nameStore, lastName: lastNameStore, email: emailStore, userId, role:roleStore } = useStore();
  const [name, setName] = useState<string>(nameStore);
  const [lastName, setLastName] = useState<string>(lastNameStore);
  const [email, setEmail] = useState<string>(emailStore);
  const [errorMessageName, setErrorMessageName] = useState<string>("");
  const [errorMessageLastName, setErrorMessageLastName] = useState<string>("");
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");

  const onClickButton = async () => {
    if (userId !== null) {
      
      const payload: updatePayload = {
        name: nameStore,
        lastName: lastNameStore,
        email: emailStore,
      };
      
      if (name !== nameStore && name !== undefined) {
        payload.name = name;
      }
      if (lastName !== lastNameStore && lastName !== undefined) {
        payload.lastName = lastName;
      }
      if (email !== emailStore && email !== undefined) {
        payload.email = email;
      }
  
      if (Object.keys(payload).length > 0) {
        const response = await updateService(userId!, payload);
  
        if (response.status === 201) {
          console.log("Usuario actualizado");
          if(roleStore==="user"){
            navigation.navigate("ProfileUser");
          }
          else{
            navigation.navigate("ProfileAdmin")
          }
        } else {
          console.log("Error en la actualización");
        }
      } else {
        console.log("No se realizaron cambios");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiando datos personales</Text>
      <Input
        label="Nombre"
        value={name}
        onChangeText={(value: string) => setName(value)}
        errorMessage={errorMessageName}
      />
      <Input
        label="Apellido"
        value={lastName}
        onChangeText={(value: string) => setLastName(value)}
        errorMessage={errorMessageLastName}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={(value: string) => setEmail(value)}
        errorMessage={errorMessageEmail}
      />
      <GradientButton
        onPress={onClickButton}
        text="Actualizar datos"
        style={styles.button}
      />
    </View>
  );
}

export default ChangeInfoUser;