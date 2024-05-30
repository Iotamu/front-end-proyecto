import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from "./src/views/loading";
import Home from "./src/views/home";
import Login from "./src/views/login";
import Profile from "./src/views/profile";
import Register from "./src/views/register";
import ResetPassword from "./src/views/resetPassword";
import RequestPassword from "./src/views/requestPassword";
import RegisterSchedule from "./src/views/registerSchedule";
import WeekOverview from "./src/views/weekOverview";


export type RootStackParamList = {
    Loading: Record<string, string> | undefined;
    Home: Record<string, string> | undefined;
    Register: Record<string, string> | undefined;
    Login: Record<string, string> | undefined;
    Profile: Record<string, string> | undefined;
    RequestPassword: Record<string, string> | undefined;
    ResetPassword: Record<string, string> | undefined;
    RegisterSchedule: Record<string, string> | undefined;
    WeekOverview: Record<string, string> | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RouterProvider = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Loading">
                
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
                    name="Profile"
                    component={Profile}
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
                    name="RegisterSchedule"
                    component={RegisterSchedule}
                ></Stack.Screen>
                
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="WeekOverview"
                    component={WeekOverview}
                ></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RouterProvider;