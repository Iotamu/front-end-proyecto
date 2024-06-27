import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/views/home';
import Login from './src/views/login';
import ProfileUser from './src/views/profileUser';
import ProfileAdmin from './src/views/profileAdmin';
import Register from './src/views/register';
import RequestPassword from './src/views/requestPassword';
import UpdateScheduleAdmin from './src/views/updateScheduleAdmin';
import WeekOverview from './src/views/weekOverview';
import RegisterViews from './src/views/registerViews';
import AdminDashboard from './src/views/admindashboard';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ProfileUser: undefined;
  ProfileAdmin: undefined;
  Register: undefined;
  RequestPassword: undefined;
  UpdateScheduleAdmin: undefined;
  WeekOverview: undefined;
  RegisterViews: undefined;
  AdminDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ProfileUser" component={ProfileUser} />
        <Stack.Screen name="ProfileAdmin" component={ProfileAdmin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RequestPassword" component={RequestPassword} />
        <Stack.Screen name="UpdateScheduleAdmin" component={UpdateScheduleAdmin} />
        <Stack.Screen name="WeekOverview" component={WeekOverview} />
        <Stack.Screen name="RegisterViews" component={RegisterViews} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
