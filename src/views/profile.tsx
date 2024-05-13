import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../stores/useStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../Router";


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },
  button: {
    marginTop: 20,
  },
  forgot: {
    fontSize: 18,
    color: 'blue',
  },
});

export default Profile;