import { View, Text } from "react-native"
import styles from "./styles"

const WeekOverview = () => {
    let fechaInicio = new Date().toISOString().split('T')[0]
    let fechaTermino = new Date().toISOString().split('T')[0]
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Resumen Semanal
            </Text>
            <Text style={styles.text}>
                {fechaInicio}
            </Text>
        </View>
    )
}

export default WeekOverview