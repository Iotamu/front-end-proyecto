import { Text, View } from "react-native"
import RNPickerSelect from 'react-native-picker-select'
import styles from "./styles"
import { Button, Divider} from "react-native-elements"
import { useEffect, useState } from "react"
import weeklyChartAdminServices from "../services/weeklyChartAdmin.services"
import useStore from "../stores/useStore"
import fetchUsersServices from "../services/fetchUsers.services"
import { GradientButton } from "../component/gradient"
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts"

interface User {
    id: number
    name: string
}

const WeeklyChartAdmin = () => {
    const { userId } = useStore();
    const [ users, setUsers ] = useState<User[]>([])
    const [ selectedUserId, setSelectedUserId ] = useState<number>(0)
    const [ hasSearched, setHasSearched ] = useState<Boolean>(false)
    const [ hasSelected, setHasSelected ] = useState<Boolean>(false)
    const [ interval, setInterval ] = useState<number>(0)
    const [ screenMonday, setScreenMonday ] = useState<string>("")
    const [ screenSunday, setScreenSunday ] = useState<string>("")
    const [ monValue, setMonValue ] = useState<number>(0)
    const [ tueValue, setTueValue ] = useState<number>(0)
    const [ wedValue, setWedValue ] = useState<number>(0)
    const [ thuValue, setThuValue ] = useState<number>(0)
    const [ friValue, setFriValue ] = useState<number>(0)
    const [ satValue, setSatValue ] = useState<number>(0)
    const [ sunValue, setSunValue ] = useState<number>(0)
    var currentDate, mondayNum
    var barData: number[]
    var labels: string[]
    var monday:string, tuesday:string, wednesday:string, thursday:string, friday:string, saturday:string, sunday: string //variables que guardan los dias en string
    var data = [
        { day: 'Lun', value: monValue},
        { day: 'Mar', value: tueValue},
        { day: 'Mie', value: wedValue},
        { day: 'Jue', value: thuValue},
        { day: 'Vie', value: friValue},
        { day: 'Sab', value: satValue},
        { day: 'Dom', value: sunValue}
    ]
    barData = data.map(item => item.value)
    labels = data.map(item => item.day)

    useEffect(() => {
        setHasSelected(false)
        fetchUsers()
        changeWeek(0)
    },[])
    
    useEffect(() => {
        changeWeek(interval)
        resetScreenValues()
    }, [interval,selectedUserId])

    const changeWeek = (value = 0) => {
        currentDate = new Date
        mondayNum = currentDate.getDate() - currentDate.getDay() + 1 + value
        monday = new Date(currentDate.setDate(mondayNum)).toISOString().split('T')[0]
        setScreenMonday(monday)
        tuesday = new Date(currentDate.setDate(mondayNum + 1)).toISOString().split('T')[0]
        wednesday = new Date(currentDate.setDate(mondayNum + 2)).toISOString().split('T')[0]
        thursday = new Date(currentDate.setDate(mondayNum + 3)).toISOString().split('T')[0]
        friday = new Date(currentDate.setDate(mondayNum + 4)).toISOString().split('T')[0]
        saturday = new Date(currentDate.setDate(mondayNum + 5)).toISOString().split('T')[0]
        sunday = new Date(currentDate.setDate(mondayNum + 6)).toISOString().split('T')[0]
        setScreenSunday(sunday)
    }

    const nextInterval = () => {
        setInterval(interval + 7)
        setHasSearched(false)
    }

    const previousInterval = () => {
        setInterval(interval - 7)
        setHasSearched(false)
    }

    const onRefresh = async () => {
        changeWeek(interval)
        setHasSearched(true)
        const {data, status } = await weeklyChartAdminServices(selectedUserId,screenMonday,screenSunday)
        if(status === 200 && data){
            for(var i = 0;i<data.length;i++){
                if(data[i].dateReport === monday){
                    setMonValue(data[i].minutes / 60)
                }
                if(data[i].dateReport === tuesday){
                    setTueValue(data[i].minutes / 60) 
                }
                if(data[i].dateReport === wednesday){
                    setWedValue(data[i].minutes / 60)
                }
                if(data[i].dateReport === thursday){
                    setThuValue(data[i].minutes / 60)
                }
                if(data[i].dateReport === friday){
                    setFriValue(data[i].minutes / 60)
                }
                if(data[i].dateReport === saturday){
                    setSatValue(data[i].minutes / 60)
                }
                if(data[i].dateReport === sunday){
                    setSunValue(data[i].minutes / 60)
                }
            }
        }
    }

    const fetchUsers = async () => {
        const response = await fetchUsersServices(userId)
        if(response.status === 200 && response.data){
            setUsers(response.data)
        }
    }

    const handleChange = (value: number) => {
        setSelectedUserId(value)
        setHasSelected(true)
    }

    const resetScreenValues = () => {
        setMonValue(0)
        setTueValue(0)
        setWedValue(0)
        setThuValue(0)
        setFriValue(0)
        setSatValue(0)
        setSunValue(0)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tiempo de trabajo semanal</Text>
            <Text style={styles.subtitle}>{String(hasSelected)} Semana del Lunes: {screenMonday}</Text>
            <Text style={styles.text}>Elige un usuario:</Text>
            <RNPickerSelect
                onValueChange={handleChange}
                items={users.map(user => ({
                    label:`Usuario ${user.id} ${user.name}`,
                    value: user.id
                }))}
            ></RNPickerSelect>
            <Button
                onPress={onRefresh}
                disabled={!hasSelected}
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
                <Text style={{paddingRight: 25}}>Semana anterior</Text>
                <Divider orientation="vertical"></Divider>
                <Text style={{paddingLeft: 25}}>Semana siguiente</Text>
            </View>
            <View style={styles.vertical}>
                <GradientButton onPress={previousInterval} text="<" style={styles.buttonNextPrev}/>
                <Divider orientation="vertical"></Divider>
                <GradientButton onPress={nextInterval} text=">" style={styles.buttonNextPrev}/>
            </View>
        </View>
    )
}

export default WeeklyChartAdmin