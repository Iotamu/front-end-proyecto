import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "../../Router"

type Form = {
    name: string
    lastname: string
    email: string
    password: string
    role: string
}

const BlankForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    role:''
}

const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [data, setData] = useState<Form>(BlankForm)

    const setValue = (key: string, value: string) => {
        setData((prevState) =>{
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>
                Registrando un nuevo usuario
            </Text>
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