import { useNavigation } from "@react-navigation/native"
import useStore from "../stores/useStore"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/Router"
import { Text, View } from "react-native"
import styles from "./styles"

const RegisterSchedule = () => {
    const {name}  = useStore()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Operación exitosa!
            </Text>
            <Text style={styles.title}>
                Registraste tu horario
            </Text>
        </View>
    )
}

export default RegisterSchedule