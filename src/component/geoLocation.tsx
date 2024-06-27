import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import locationStore from '../stores/locationStore';
import { RootStackParamList } from '../../Router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from "@react-navigation/native";
import Loading from '../views/loading';


export default function GeoLocation() {
  const [loading, setLoading] = useState<boolean>(false);
  const {setLatitude: setLatitudeStore, setLongitude:setLongitudeStore } = locationStore()
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage('El permiso fue denegado');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatitudeStore(location.coords.latitude.toString());
        setLongitudeStore(location.coords.longitude.toString());
        setLocation(location);
        console.log(location);
        setLoading(true);
        
      } catch (error) {
        console.error('Error al obtener la locacion:', error);
        setErrorMessage('Error al obtener la locacion');
      }
    })();
  }, []);

  return 
}