import useStore from "../stores/useStore"
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/Router"
import { Text, View } from "react-native"
import styles from "../views/styles";

const RegisterScheduleMessage = () => {
    const {name}  = useStore()
    const route = useRoute<RouteProp<RootStackParamList, 'RegisterScheduleMessage'>>();
    const hora = route.params?.hora;
    const tipo = route.params?.tipo;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {name}
            </Text>
            <Text style={styles.title}>
                Registraste tu horario de {tipo}: 
                {"\n"}
                {hora}               
            </Text>
        </View>
    )
}

export default RegisterScheduleMessage