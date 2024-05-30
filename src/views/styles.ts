import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#9900ef',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue'
  }
  ,
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    width: '80%'
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
  backgroundImage: {
    alignSelf: 'center',
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
  forgot: {
    fontSize: 18,
    color: "blue",
  },
})

export default styles;