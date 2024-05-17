import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import healthcheckService from '../services/healthcheck.services';
import styles from './styles';

const Loading = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isVisible, setIsVisible] = useState(true);

  const getHealthcheck = async () => {
    const response = await healthcheckService();

    if (response.status === 200) {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    getHealthcheck()
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); //4 segundos
    return () => clearTimeout(timer);
    
  }, []);

  return (
    <View style={[styles.container, { display: isVisible ? 'flex' : 'none' }]}>
      <ActivityIndicator size="large" color="#9900ef" />
    </View>
  );
};

export default Loading;