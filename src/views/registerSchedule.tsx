import { useNavigation } from "@react-navigation/native"
import useStore from "../stores/useStore"
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/Router"
import { Text, View } from "react-native"
import styles from "./styles"

const RegisterSchedule = () => {
    const {name}  = useStore()
    const route = useRoute<RouteProp<RootStackParamList, 'RegisterSchedule'>>();
    const hora = route.params?.hora;
    const tipo = route.params?.tipo;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {name}
            </Text>
            <Text style={styles.title}>
                Registraste tu horario de {tipo}:
                {hora}               
            </Text>
        </View>
    )
}

export default RegisterSchedule