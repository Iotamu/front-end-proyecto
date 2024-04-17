import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/views/home";
import Login from "./src/views/login";
import Profile from "./src/views/profile";

export type RootStackParamList = {
    Home: Record<string, string> | undefined;
    //Register: Record<string, string> | undefined;
    Login: Record<string, string> | undefined;
    Profile: Record<string, string> | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RouterProvider = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    options={{ headerShown: true }}
                    name="Home"
                    component={Home}
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RouterProvider;