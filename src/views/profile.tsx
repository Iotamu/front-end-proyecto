import { StyleSheet, Text, View } from "react-native"
import useStore from "../stores/useStore"

const Profile = () => {
    const { user } = useStore();

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>
                Accediste!

                Bienvenido {user}
            </Text>
        </View>
    )
}

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
    }
  });

export default Profile