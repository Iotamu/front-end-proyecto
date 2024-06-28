import { Text, View } from "react-native"
import styles from "./styles"
import { useEffect, useState } from "react"
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts"
import { Button, Divider } from "react-native-elements"
import { GradientButton } from "../component/gradient"
import yearlyChartAdminServices from "../services/yearlyChartAdmin.services"

const YearlyChartAdmin = () => {
    const [ screenYear, setScreenYear ] = useState<number>(0)
    const [ screenText, setScreenText ] = useState<string>("")
    const [ interval, setInterval ] = useState<number>(0)
    const [ januaryFirst, setJanuaryFirst ] = useState<string>("")
    const [ decemberthirtyfirst, setDecemberThirtyFirst ] = useState<string>("")
    const [ janValue, setJanValue ] = useState<number>(0)
    const [ febValue, setFebValue ] = useState<number>(0)
    const [ marValue, setMarValue ] = useState<number>(0)
    const [ aprValue, setAprValue ] = useState<number>(0)
    const [ mayValue, setMayValue ] = useState<number>(0)
    const [ junValue, setJunValue ] = useState<number>(0)
    const [ julValue, setJulValue ] = useState<number>(0)
    const [ augValue, setAugValue ] = useState<number>(0)
    const [ sepValue, setSepValue ] = useState<number>(0)
    const [ octValue, setOctValue ] = useState<number>(0)
    const [ novValue, setNovValue ] = useState<number>(0)
    const [ decValue, setDecValue ] = useState<number>(0)
    const [ hasSearched, setHasSearched] = useState<Boolean>(false)
    
    const isWeekday = (date: string) => {
        var day = new Date(date).getDay()
        return day != 0 && day!= 6
    }

    const workdaysMonth = (month:number,year:number) => {
        var days = 32 - new Date(year,month,32).getDate()
        var workdays = 0
        for(var i=0;i<days;i++){
            if(isWeekday(String(year)+"-"+String(month)+"-"+String(i+1))){
                workdays++
            }
        }
        return workdays
    }
    
    var data = [
        { month: 'Ene', value: janValue/workdaysMonth(1,screenYear)},
        { month: 'Feb', value: febValue/workdaysMonth(2,screenYear)},
        { month: 'Mar', value: marValue/workdaysMonth(3,screenYear)},
        { month: 'Abr', value: aprValue/workdaysMonth(4,screenYear)},
        { month: 'May', value: mayValue/workdaysMonth(5,screenYear)},
        { month: 'Jun', value: junValue/workdaysMonth(6,screenYear)},
        { month: 'Jul', value: julValue/workdaysMonth(7,screenYear)},
        { month: 'Ago', value: augValue/workdaysMonth(8,screenYear)},
        { month: 'Sep', value: sepValue/workdaysMonth(9,screenYear)},
        { month: 'Oct', value: octValue/workdaysMonth(10,screenYear)},
        { month: 'Nov', value: novValue/workdaysMonth(11,screenYear)},
        { month: 'Dic', value: decValue/workdaysMonth(12,screenYear)},
    ]
    var barData = data.map(item => item.value)
    var labels = data.map(item => item.month)

    useEffect(() =>{
        changeYear(interval)
        resetScreenValues()
        setHasSearched(false)
    },[interval])

    const onRefresh = async () => {
        changeYear(interval)
        const { data, status } = await yearlyChartAdminServices(januaryFirst,decemberthirtyfirst)
        if(status === 201 && data){
            for(var i=0; i<data.length;i++){//se recorren todos los datos del año
                if(isWeekday(data[i].dateReport)){//solamente si son dias hábiles
                    //castea como Number...
                    //el mes (del string en formato YYYY-MM-DD)
                    if(Number(data[i].dateReport.split('-')[1]) == 1){ //si la fecha está en Enero
                        setJanValue(janValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 2){
                        setFebValue(febValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 3){
                        setMarValue(marValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 4){
                        setAprValue(aprValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 5){
                        setMayValue(mayValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 6){
                        setJunValue(junValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 7){
                        setJulValue(julValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 8){
                        setAugValue(augValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 9){
                        setSepValue(sepValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 10){
                        setOctValue(octValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 11){
                        setNovValue(novValue + (data[i].minutes /60))
                    }
                    if(Number(data[i].dateReport.split('-')[1]) == 12){
                        setDecValue(decValue + (data[i].minutes /60))
                    }
                }
            }
        }
        setHasSearched(true)
    }

    const changeYear = (value = 0) => {
        var currentDate = new Date
        var januaryFirst = new Date(currentDate.getFullYear() + value,0,1).toISOString().split('T')[0]
        setJanuaryFirst(januaryFirst)
        var decemberThirtyFirst = new Date(currentDate.getFullYear() + value,11,31).toISOString().split('T')[0]
        setDecemberThirtyFirst(decemberThirtyFirst)
        setScreenYear(currentDate.getFullYear())
    }

    const previousInterval = () => {
        setInterval(interval - 1)
    }
    const nextInterval = () => {
        setInterval(interval + 1)
    }

    const resetScreenValues = () => {
        setJanValue(0)
        setFebValue(0)
        setMarValue(0)
        setAprValue(0)
        setMayValue(0)
        setJunValue(0)
        setJulValue(0)
        setAugValue(0)
        setSepValue(0)
        setOctValue(0)
        setNovValue(0)
        setDecValue(0)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Promedios del año {screenYear + interval}</Text>
            <Text style={styles.subtitle}>{screenText}</Text>
            <Button
                disabled={!!hasSearched}
                onPress={onRefresh}
                title="Actualizar"
                type="solid"
            ></Button>
            <View style={styles.yAxisContainer}>
                <YAxis
                    data={barData}
                    contentInset={{top:20,bottom:20}}
                    svg={{fontSize:10,fill:'grey'}}
                    numberOfTicks={8}
                />
                <View style={styles.chartContainer}>
                    <BarChart
                        style={{flex: 1}}
                        data={barData}
                        svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
                        contentInset={{top:30,bottom:30}}
                    >
                        <Grid />
                    </BarChart>
                    <XAxis
                        style={{ marginHorizontal:-10}}
                        data={barData}
                        formatLabel={(index) => labels[index]}
                        contentInset={{left:30,right:30}}
                        svg={{fontSize:10, fill:'black'}}
                    />
                </View>
            </View>
            <View style={styles.vertical}>
                <Text style={{paddingRight: 25}}>Año anterior</Text>
                <Divider orientation="vertical"></Divider>
                <Text style={{paddingLeft: 25}}>Año siguiente</Text>
            </View>
            <View style={styles.vertical}>
                <GradientButton onPress={previousInterval} text="<" style={styles.buttonNextPrev}/>
                <Divider orientation="vertical"></Divider>
                <GradientButton onPress={nextInterval} text=">" style={styles.buttonNextPrev}/>
            </View>

        </View>
    )
}

export default YearlyChartAdmin