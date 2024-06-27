import { Text, View } from "react-native"
import styles from "./styles"
import { Button, Divider, Input } from "react-native-elements"
import { useEffect, useState } from "react"
import weeklyChartAdminServices from "../services/weeklyChartAdmin.services"
import { BarChart, Grid } from "react-native-svg-charts"

const WeeklyChartAdmin = () => {
    const [ searchedID, setSearchedID ] = useState<number>(0)
    const [ hasSearched, setHasSearched ] = useState<Boolean>(false)
    const [ interval, setInterval ] = useState<number>(0)
    const [ screenMonday, setScreenMonday ] = useState<string>("")
    var currentDate, mondayNum
    var monday:string

    useEffect(() => {
        setHasSearched(false)
    }, [searchedID, interval])

    const changeWeek = (value = 0) => {
        currentDate = new Date
        mondayNum = currentDate.getDate() - currentDate.getDay() + value
        monday = new Date(currentDate.setDate(mondayNum)).toISOString().split('T')[0]
        setScreenMonday(monday)
    }

    const nextInterval = () => {
        setInterval(interval + 7)
    }

    const previousInterval = () => {
        setInterval(interval - 7)
    }

    const onSearch = async () => {
        setHasSearched(true)
        const response = await weeklyChartAdminServices(searchedID,monday)
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tiempo de trabajo semanal</Text>
            <View style={styles.vertical}>
                <View style={styles.inputContainer}>
                    <Input
                        label="Trabajador buscado"
                        placeholder="ID de usuario"
                        onChangeText={(value: string) => setSearchedID(Number(value))}
                    ></Input>
                </View>
            <Divider orientation="vertical"></Divider>
            <Button
                disabled={!!hasSearched}
                title="Buscar"
                type="solid"
                onPress={onSearch}
            ></Button>
            </View>
            <BarChart style={{height: 200}} data={[1,2,3,4,5]} contentInset={{top:30, bottom:30}}>
                <Grid/>
            </BarChart>
            

        </View>
    )
}

export default WeeklyChartAdmin