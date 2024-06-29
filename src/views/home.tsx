import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GradientButton } from '../component/gradient'; 
import { RootStackParamList } from '../../Router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import GeoLocationViews from './geoLocationViews';
import { Button, Divider } from 'react-native-elements';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);  


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
  const onGeoLocation = () => {
    setShowLocation(true);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./background2.png')} style={styles.backgroundImage}>
        <View style={styles.content}>
          <Text style={styles.title}>¡Bienvenido(a)!</Text>
          {/*<GradientButton onPress={onAccess} style={styles.button} text="Acceder" />*/}
          <Button
            onPress={onAccess}
            type='solid'
            containerStyle={styles.loginButton}
            title={"Acceder"}
            disabled={!showLocation}
          ></Button>
          <TouchableOpacity onPress={onRegister} style={[styles.button, styles.registerButton]}>
            <Text style={styles.buttonText}>Crear una cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGeoLocation} style={[styles.button, styles.registerButton]}>
            <Text style={styles.buttonText}>obtener localizacion</Text>
          </TouchableOpacity>
          {/*loading && <ActivityIndicator size="large" color="#9900ef" />*/}{}
          {showLocation && <GeoLocationViews />}{}
        </View>
      </ImageBackground>
    </View>
  );
};


export default Home;