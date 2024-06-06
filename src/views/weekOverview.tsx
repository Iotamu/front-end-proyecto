import { View, Text } from "react-native";
//import algo que cree tablas bonitas
import styles from "./styles";

const WeekOverview = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Resumen Semanal
            </Text>
            <Text style={styles.subtitle}>
                Lunes
            </Text>
            <Text style={styles.text}>
                Entrada
            </Text>
            <Text style={styles.text}>
                Salida
            </Text>
            <Text style={styles.subtitle}>
                Martes
            </Text>
            <Text style={styles.text}>
                Entrada
            </Text>
            <Text style={styles.text}>
                Salida
            </Text>
            <Text style={styles.subtitle}>
                Miércoles
            </Text>
            <Text style={styles.text}>
                Entrada
            </Text>
            <Text style={styles.text}>
                Salida
            </Text>
            <Text style={styles.subtitle}>
                Jueves
            </Text>
            <Text style={styles.text}>
                Entrada
            </Text>
            <Text style={styles.text}>
                Salida
            </Text>
            <Text style={styles.subtitle}>
                Viernes
            </Text>
            <Text style={styles.text}>
                Entrada
            </Text>
            <Text style={styles.text}>
                Salida
            </Text>
            <Text style={styles.subtitle}>
                Sábado
            </Text>
            <Text style={styles.text}>
                Entrada
            </Text>
            <Text style={styles.text}>
                Salida
            </Text>
            <Text style={styles.subtitle}>
                Domingo
            </Text>
        </View>
    )
}

export default WeekOverview