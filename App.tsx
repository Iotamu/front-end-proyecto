import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
//import { NativeBaseProvider } from 'native-base';
import RouterProvider from './Router';

export default function App() {
  return (
    /*
    <View>
      <Text style={styles.title}>Inicio</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    */
   
    <SafeAreaProvider>
      <ThemeProvider>
        
          <RouterProvider />
        
      </ThemeProvider>
    </SafeAreaProvider>
    
  );
}

