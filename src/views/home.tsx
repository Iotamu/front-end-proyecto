import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../component/gradient'; 
import { RootStackParamList } from '../../Router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState<boolean>(false);

  const onAccess = () => {
    setLoading(true);
    console.log('Login...');
    navigation.navigate('Login');
  }

  const onRegister = () => {
    setLoading(true);
    console.log('Register...');
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./background2.png')} style={styles.backgroundImage}>
        <View style={styles.content}>
          <Text style={styles.title}>¡Bienvenido(a)!</Text>
          <GradientButton onPress={onAccess} style={styles.button} text="Acceder" />
          <TouchableOpacity onPress={onRegister} style={[styles.button, styles.registerButton]}>
            <Text style={styles.buttonText}>Crear una cuenta</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#9900ef" />}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#9900ef',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#8a2be2',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#9900ef',
  },
});

export default Home;