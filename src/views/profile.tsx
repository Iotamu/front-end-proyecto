import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../stores/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";
import styles from './styles';


const Profile = () => {
  const { user } = useStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressChangePassword = () => {if (navigation) {
      navigation.navigate('ResetPassword');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Accediste!
      </Text>
      <Text style={styles.title}>
        Bienvenido {user}
      </Text>
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressChangePassword}>
          <Text style={styles.forgot}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Profile;