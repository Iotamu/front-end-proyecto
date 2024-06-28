import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import locationStore from '../stores/locationStore';
import { RootStackParamList } from '../../Router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from "@react-navigation/native";


export default function GeoLocationViews() {
  const {setLatitude: setLatitudeStore, setLongitude:setLongitudeStore } = locationStore()
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'GeoLocationViews'>>();
  const tipo = route.params?.tipo;
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
        console.log(location)
      } catch (error) {
        console.error('Error al obtener la locacion:', error);
        setErrorMessage('Error al obtener la locacion');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Location</Text>
      {errorMessage ? (
        <Text style={styles.errorMsg}>{errorMessage}</Text>
      ) : (
        location && (
          <View>
            <Text>Latitude: {location.coords.latitude}</Text>
            <Text>Longitude: {location.coords.longitude}</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  errorMsg: {
    fontSize: 18,
    color: 'red',
  },
});