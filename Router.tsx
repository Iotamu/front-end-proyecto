import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from "./src/views/loading";
import Home from "./src/views/home";
import Login from "./src/views/login";
import ProfileUser from "./src/views/profileUser";
import ProfileAdmin from "./src/views/profileAdmin";
import Register from "./src/views/register";
import ResetPassword from "./src/views/resetPassword";
import RequestPassword from "./src/views/requestPassword";
import RegisterScheduleMessage from "./src/viewsMessage/registerScheduleMessage";
import WeekOverview from "./src/views/weekOverview";
import ChangeInfoUser from "./src/views/changeInfoUser";
import GeoLocationViews from './src/views/geoLocationViews';
import CreateScheduleAdmin from "./src/views/createScheduleAdmin";
import ChangeScheduleMessage from "./src/viewsMessage/changeScheduleMessage";
import UpdateScheduleAdmin from "./src/views/updateScheduleAdmin2";
import RegisterViews from './src/views/registerViews';
import WeeklyChartAdmin from "./src/views/weeklyChartAdmin";
import YearlyChartAdmin from "./src/views/yearlyChartAdmin";

export type RootStackParamList = {
    Loading: Record<string, string> | undefined;
    Home: Record<string, string> | undefined;
    Register: Record<string, string> | undefined;
    Login: Record<string, string> | undefined;
    ProfileUser: Record<string, string> | undefined;
    ProfileAdmin: Record<string, string> | undefined;
    RequestPassword: Record<string, string> | undefined;
    ResetPassword: Record<string, string> | undefined;
    RegisterScheduleMessage: Record<string, string> | undefined;
    WeekOverview: Record<string, string> | undefined;
    ChangeInfoUser: Record<string, string> | undefined;
    GeoLocationViews: Record<string, string> | undefined;
    CreateSchedulesAdmin: Record<string, string> | undefined;
    ChangeScheduleMessage: Record<string, string> | undefined;
    UpdateScheduleAdmin: Record<string, string> | undefined;
    RegisterViews: Record<string, string> | undefined;
    WeeklyChartAdmin: Record<string,string> | undefined;
    YearlyChartAdmin: Record<string,string> | undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const RouterProvider = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="Loading"
                    component={Loading}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={Home}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true }}
                    name= "Register"
                    component={Register}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true}}
                    name="Login"
                    component={Login}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true}}
                    name="ProfileUser"
                    component={ProfileUser}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true}}
                    name="ProfileAdmin"
                    component={ProfileAdmin}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true }}
                    name="RequestPassword"
                    component={RequestPassword}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true }}
                    name="ResetPassword"
                    component={ResetPassword}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true }}
                    name="RegisterScheduleMessage"
                    component={RegisterScheduleMessage}
                ></Stack.Screen>
                
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="WeekOverview"
                    component={WeekOverview}
                ></Stack.Screen>
                
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="ChangeInfoUser"
                    component={ChangeInfoUser}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="GeoLocationViews"
                    component={GeoLocationViews}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="CreateSchedulesAdmin"
                    component={CreateScheduleAdmin}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="ChangeScheduleMessage"
                    component={ChangeScheduleMessage}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="UpdateScheduleAdmin"
                    component={UpdateScheduleAdmin}
                ></Stack.Screen>
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="RegisterViews"
                    component={RegisterViews}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true }}
                    name="WeeklyChartAdmin"
                    component={WeeklyChartAdmin}
                ></Stack.Screen>

                <Stack.Screen
                    options={{ headerShown: true }}
                    name="YearlyChartAdmin"
                    component={YearlyChartAdmin}
                ></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RouterProvider;