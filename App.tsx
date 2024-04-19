import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
//import { NativeBaseProvider } from 'native-base';
import RouterProvider from './Router';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        
          <RouterProvider />
        
      </ThemeProvider>
    </SafeAreaProvider>
    
  );
}

