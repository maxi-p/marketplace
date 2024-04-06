import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../logic/UserContext';

function buildPath(route) {
  const app_name = 'cop4331-marketplace-98e1376d9db6';
  return 'https://' + app_name + '.herokuapp.com/' + route;
}

const Login = (props) => {
  const { setId, setUsername, setFirstName, setLastName, setEmail, setPhoneNumber, setAboutMe } = useContext(UserContext);
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const doLogin = async () => {
    try {
      const obj = { username, password };
      const js = JSON.stringify(obj);

      const response = await fetch(buildPath('api/login'), {
        method: 'POST',
        body: js,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await response.json();

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      } else {
        // Update user context with user information
        setId(res.id);
        setUsername(res.username);
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setEmail(res.email);
        setPhoneNumber(res.phoneNumber);
        setAboutMe(res.aboutMe);

        // Navigate to Home screen
        props.navigation?.navigate('Post-Login');
        // Clear form fields and error message
        setUsernameState('');
        setPassword('');
        setMessage('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const registerRedirect = () => {
    props.navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsernameState}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={doLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={registerRedirect}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginBottom: 150,
    marginVertical: 0,
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 60,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    margin: 10,
    marginHorizontal: 75,
  },
  message: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Login;
