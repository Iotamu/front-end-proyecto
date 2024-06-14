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
    const [ interval, setInterval ] = useState<number>(0)
    const [ screenMonday, setScreenMonday] = useState<string>("")
    const [ screenSunday, setScreenSunday] = useState<string>("")

    var currentDate, mondayNum, tuesdayNum, wednesdayNum, thursdayNum, fridayNum, saturdayNum, sundayNum //variables auxiliares para el cálculo de fechas
    var monday:string, tuesday:string, wednesday:string, thursday:string, friday:string, saturday:string, sunday: string //variables que guardan los dias en string

    useEffect(() =>{ //cualquier cambio en "interval" vuelve a mostrar los horarios
        resetScreenValues()
        Refresh()
    },[interval])

    const changeWeek = (value = 0) => {
        //Al dia actual del mes (ej:14) se le resta el día de la semana(ej: jueves=4) para iniciar desde el principio de la semana (ej: 14 - 4 = 10 => lunes es 10)
        currentDate = new Date
        
        mondayNum = currentDate.getDate() - currentDate.getDay() + value
        tuesdayNum = mondayNum + 1
        wednesdayNum = mondayNum + 2
        thursdayNum = mondayNum + 3
        fridayNum = mondayNum + 4
        saturdayNum = mondayNum + 5
        sundayNum = mondayNum + 6

        monday = new Date(currentDate.setDate(mondayNum)).toISOString().split('T')[0]
        setScreenMonday(monday)
        tuesday = new Date(currentDate.setDate(tuesdayNum)).toISOString().split('T')[0]
        wednesday = new Date(currentDate.setDate(wednesdayNum)).toISOString().split('T')[0]
        thursday = new Date(currentDate.setDate(thursdayNum)).toISOString().split('T')[0]
        friday = new Date(currentDate.setDate(fridayNum)).toISOString().split('T')[0]
        saturday = new Date(currentDate.setDate(saturdayNum)).toISOString().split('T')[0]
        sunday = new Date(currentDate.setDate(sundayNum)).toISOString().split('T')[0]
        setScreenSunday(sunday)
    }

    const nextInterval = () => {
        setInterval(interval + 7)
    }

    const previousInterval = () => {
        setInterval(interval - 7)
    }

    const resetScreenValues = () => { //Reinicia los valores mostrados para evitar mostrar horarios incorrectos
        setLunesE("")
        setLunesS("")
        setMartesE("")
        setMartesS("")
        setMiercolesE("")
        setMiercolesS("")
        setJuevesE("")
        setJuevesS("")
        setViernesE("")
        setViernesS("")
        setSabadoE("")
        setSabadoS("")
        setDomingoE("")
        setDomingoS("")
    }

    const Refresh = async () => {
        changeWeek(interval)
        const { data, status } = await getWeekUser(userId,monday,sunday)
        if (status === 200 && data) {
            for(var i=0;i<14;i++){ //Ciclo for que muestra los horarios de entrada y salida de cada dia
                if(data[i].fecha.split('T')[0] === monday){//Si hay registro de dia "lunes"...
                    if(data[i].tipo === "entrada"){// si es registro de entrada...
                        setLunesE(data[i].hora)
                    }else if(data[i].tipo === "salida"){// si es registro de salida...
                        setLunesS(data[i].hora)
                    }
                }
                if(data[i].fecha.split('T')[0] === tuesday){
                    if(data[i].tipo === "entrada"){
                        setMartesE(data[i].hora)
                    }else if(data[i].tipo === "salida"){
                        setMartesS(data[i].hora)
                    }
                }
                if(data[i].fecha.split('T')[0] === wednesday){
                    if(data[i].tipo === "entrada"){
                        setMiercolesE(data[i].hora)
                    }else if(data[i].tipo === "salida"){
                        setMiercolesS(data[i].hora)
                    }
                }
                if(data[i].fecha.split('T')[0] === thursday){
                    if(data[i].tipo === "entrada"){
                        setJuevesE(data[i].hora)
                    }else if(data[i].tipo === "salida"){
                        setJuevesS(data[i].hora)
                    }
                }
                if(data[i].fecha.split('T')[0] === friday){
                    if(data[i].tipo === "entrada"){
                        setViernesE(data[i].hora)
                    }else if(data[i].tipo === "salida"){
                        setViernesS(data[i].hora)
                    }
                }
                if(data[i].fecha.split('T')[0] === saturday){
                    if(data[i].tipo === "entrada"){
                        setSabadoE(data[i].hora)
                    }else if(data[i].tipo === "salida"){
                        setSabadoS(data[i].hora)
                    }
                }
                if(data[i].fecha.split('T')[0] === sunday){
                    if(data[i].tipo === "entrada"){
                        setDomingoE(data[i].hora)
                    }else if(data[i].tipo === "salida"){
                        setDomingoS(data[i].hora)
                    }
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumen Semanal</Text>
            <Text style={styles.text}>Semana: {interval/7}, desde {screenMonday} hasta {screenSunday}</Text>
            {/*<GradientButton onPress={onRefresh} text="Refrescar" style={styles.button} />*/}
            <GradientButton onPress={nextInterval} text="Siguiente" style={styles.buttonNextPrev} />
            <GradientButton onPress={previousInterval} text="Anterior" style={styles.buttonNextPrev} />
            <Text style={styles.subtitle}>Lunes</Text>
            <Text style={styles.text}>Entrada: {lunesE}</Text>
            <Text style={styles.text}>Salida {lunesS}</Text>
            <Text style={styles.subtitle}>Martes</Text>
            <Text style={styles.text}>Entrada {martesE}</Text>
            <Text style={styles.text}>Salida {martesS}</Text>
            <Text style={styles.subtitle}>Miércoles</Text>
            <Text style={styles.text}>Entrada {miercolesE}</Text>
            <Text style={styles.text}>Salida {miercolesS}</Text>
            <Text style={styles.subtitle}>Jueves</Text>
            <Text style={styles.text}>Entrada {juevesE}</Text>
            <Text style={styles.text}>Salida {juevesS}</Text>
            <Text style={styles.subtitle}>Viernes</Text>
            <Text style={styles.text}>Entrada {viernesE}</Text>
            <Text style={styles.text}>Salida {viernesS}</Text>
            <Text style={styles.subtitle}>Sábado</Text>
            <Text style={styles.text}>Entrada {sabadoE}</Text>
            <Text style={styles.text}>Salida {sabadoS}</Text>
            <Text style={styles.subtitle}>Domingo</Text>
            <Text style={styles.text}>Entrada {domingE}</Text>
            <Text style={styles.text}>Salida {domingoS}</Text>
        </View>
    )
}

export default WeekOverview