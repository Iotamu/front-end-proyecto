import { View, Text } from "react-native";
//import algo que cree tablas bonitas xd
import styles from "./styles";
import getWeekUser from "../services/getWeekUser.services";
import useStore from "../stores/useStore";
import { useState, useEffect } from "react";
import { GradientButton } from "../component/gradient";

const WeekOverview = () => {
    const { name, lastName, userId, email, role } = useStore();
    const [ lunesE, setLunesE ] = useState<string>("")
    const [ lunesS, setLunesS ] = useState<string>("")
    const [ martesE, setMartesE ] = useState<string>("")
    const [ martesS, setMartesS ] = useState<string>("")
    const [ miercolesE, setMiercolesE ] = useState<string>("")
    const [ miercolesS, setMiercolesS ] = useState<string>("")
    const [ juevesE, setJuevesE ] = useState<string>("")
    const [ juevesS, setJuevesS ] = useState<string>("")
    const [ viernesE, setViernesE ] = useState<string>("")
    const [ viernesS, setViernesS ] = useState<string>("")
    const [ sabadoE, setSabadoE ] = useState<string>("")
    const [ sabadoS, setSabadoS ] = useState<string>("")
    const [ domingE, setDomingoE ] = useState<string>("")
    const [ domingoS, setDomingoS ] = useState<string>("")
    const [ primerDia, setPrimerDia] = useState<string>("")
    const [ ultimoDia, setUltimoDia] = useState<string>("")

    var currentDate = new Date
    var mondayNum = currentDate.getDate() - currentDate.getDay() + 1
    var tuesdayNum = mondayNum + 1
    var wednesdayNum = mondayNum + 2
    var thursdayNum = mondayNum + 3
    var fridayNum = mondayNum + 4
    var saturdayNum = mondayNum + 5
    var sundayNum = mondayNum + 6

    var monday = new Date(currentDate.setDate(mondayNum)).toISOString().split('T')[0]
    var tuesday = new Date(currentDate.setDate(tuesdayNum)).toISOString().split('T')[0]
    var wednesday = new Date(currentDate.setDate(wednesdayNum)).toISOString().split('T')[0]
    var thursday = new Date(currentDate.setDate(thursdayNum)).toISOString().split('T')[0]
    var friday = new Date(currentDate.setDate(fridayNum)).toISOString().split('T')[0]
    var saturday = new Date(currentDate.setDate(saturdayNum)).toISOString().split('T')[0]
    var sunday = new Date(currentDate.setDate(sundayNum)).toISOString().split('T')[0]

    useEffect(() => {

    })

    const onRefresh = async () => {
        const { data, status } = await getWeekUser(userId,monday,sunday)
        if (status === 200 && data) {
            for( var i=0;i<7;i++){
                if(data[i] && data[i].fecha.split('T')[0] === monday){
                    if(data[i].tipo === "entrada"){
                        setLunesE(data[i].hora)
                    }else{
                        setLunesS(data[i].hora)
                    }
                }
                if(data[i] && data[i].fecha.split('T')[0] === tuesday){
                    if(data[i].tipo === "entrada"){
                        setMartesE(data[i].hora)
                    }else{
                        setMartesS(data[i].hora)
                    }
                }
                if(data[i] && data[i].fecha.split('T')[0] === wednesday){
                    if(data[i].tipo === "entrada"){
                        setMiercolesE(data[i].hora)
                    }else{
                        setMiercolesS(data[i].hora)
                    }
                }
                if(data[i] && data[i].fecha.split('T')[0] === thursday){
                    if(data[i].tipo === "entrada"){
                        setJuevesE(data[i].hora)
                    }else{
                        setJuevesS(data[i].hora)
                    }
                }
                if(data[i] && data[i].fecha.split('T')[0] === friday){
                    if(data[i].tipo === "entrada"){
                        setViernesE(data[i].hora)
                    }else{
                        setViernesS(data[i].hora)
                    }
                }
                if(data[i] && data[i].fecha.split('T')[0] === saturday){
                    if(data[i].tipo === "entrada"){
                        setSabadoE(data[i].hora)
                    }else{
                        setSabadoS(data[i].hora)
                    }
                }
                if(data[i] && data[i].fecha.split('T')[0] === sunday){
                    if(data[i].tipo === "entrada"){
                        setDomingoE(data[i].hora)
                    }else{
                        setDomingoS(data[i].hora)
                    }
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Resumen Semanal desde {monday} hasta {sunday}
            </Text>
            <GradientButton onPress={onRefresh} text="Refrescar" style={styles.button} />
            <Text style={styles.subtitle}>
                Lunes
            </Text>
            <Text style={styles.text}>
                Entrada: {lunesE}
            </Text>
            <Text style={styles.text}>
                Salida {lunesS}
            </Text>
            <Text style={styles.subtitle}>
                Martes
            </Text>
            <Text style={styles.text}>
                Entrada {martesE}
            </Text>
            <Text style={styles.text}>
                Salida {martesS}
            </Text>
            <Text style={styles.subtitle}>
                Miércoles
            </Text>
            <Text style={styles.text}>
                Entrada {miercolesE}
            </Text>
            <Text style={styles.text}>
                Salida {miercolesS}
            </Text>
            <Text style={styles.subtitle}>
                Jueves
            </Text>
            <Text style={styles.text}>
                Entrada {juevesE}
            </Text>
            <Text style={styles.text}>
                Salida {juevesS}
            </Text>
            <Text style={styles.subtitle}>
                Viernes
            </Text>
            <Text style={styles.text}>
                Entrada {viernesE}
            </Text>
            <Text style={styles.text}>
                Salida {viernesS}
            </Text>
            <Text style={styles.subtitle}>
                Sábado
            </Text>
            <Text style={styles.text}>
                Entrada {sabadoE}
            </Text>
            <Text style={styles.text}>
                Salida {sabadoS}
            </Text>
            <Text style={styles.subtitle}>
                Domingo
            </Text>
            <Text style={styles.text}>
                Entrada {domingE}
            </Text>
            <Text style={styles.text}>
                Salida {domingoS}
            </Text>
        </View>
    )
}

export default WeekOverview