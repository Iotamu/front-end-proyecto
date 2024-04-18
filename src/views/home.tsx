import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { RootStackParamList } from '../../Router';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onAccess = () => {
    navigation.navigate('Login');
  }    

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Bienvenido(a)</Text>
      <Button title={"Acceder"} onPress={onAccess}>
        
      </Button>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Home;