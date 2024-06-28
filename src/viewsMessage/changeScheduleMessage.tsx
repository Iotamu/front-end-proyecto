import useStore from "../stores/useStore"
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/Router"
import { Text, View } from "react-native"
import styles from "../views/styles";
import locationStore from "../stores/locationStore";

const ChangeScheduleMessage = () => {
    const {name}  = useStore()
    const route = useRoute<RouteProp<RootStackParamList, 'RegisterScheduleMessage'>>();
    const tipo = route.params?.tipo;
    const {latitude,longitude}  = locationStore()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {name}
            </Text>
            <Text style={styles.title}>
                Su registro de {tipo} se ha actualizado
                {"\n"}
                Latitud: {latitude} 
                Longitud: {longitude}               
            </Text>
        </View>
    )
}

export default ChangeScheduleMessage