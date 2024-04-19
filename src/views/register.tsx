import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "../../Router"
import { Button, Input } from "react-native-elements"
import registerService from "../services/register.services"

type Form = {
    name: string
    lastName: string
    email: string
    password: string
}

const FormSheet = {
    name: '',
    lastName: '',
    email: '',
    password: '',
}

const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [data, setData] = useState<Form>(FormSheet)

    const setValue = (key: string, value: string) => {
        setData((prevState) =>{
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const onClickRegisterButton = async () => {
        console.log("clic registrar")
        console.log(data)
        let payload = JSON.stringify(data)
        console.log(payload)
        const response = await registerService(payload);
        
        if (response?.success) {
          setData(FormSheet);
          navigation.navigate('Login');
        }
      };

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Registrando un nuevo usuario</Text>
            <Input
                label="Nombre"
                placeholder="Tu nombre"
                value={data?.name}
                onChange={(e) => setValue('name', e?.nativeEvent?.text as string)}
            ></Input>
                
            <Input
                label="Apellido"
                placeholder="Tu apellido"
                value={data?.lastName}
                onChange={(e) => setValue('lastName', e?.nativeEvent?.text as string)}
            ></Input>
          
            <Input
                label="Email"
                placeholder="mail@ejemplo.com"
                value={data?.email}
                onChange={(e) => setValue('email', e?.nativeEvent?.text as string)}
            ></Input>
          
            <Input
                secureTextEntry
                label="Contraseña"
                placeholder="••••••"
                value={data?.password}
                onChange={(e) => setValue('password', e?.nativeEvent?.text as string)}
            ></Input>

            <Button
                title="Registrar Nueva Cuenta"
                onPress={onClickRegisterButton}
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

export default Register;