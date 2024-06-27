import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  inputContainer: {
    width: '100%',
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
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
    color: '#9900ef'
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
    width: '80%'
  },
  buttonNextPrev: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 14,
    width: '50%'
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonTextDisabled: {
    color: '#888',
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
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '120%',
    height: '100%',
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
  containerError: {
    backgroundColor: 'red',
    padding: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  vertical: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

export default styles;