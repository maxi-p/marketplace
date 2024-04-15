import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import {UserContext} from '../logic/UserContext';


function buildPath(route) {
  const app_name = 'cop4331-marketplace-98e1376d9db6';
  return 'https://' + app_name + '.herokuapp.com/' + route;
}

const Login = (props) => {
  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const doLogin = async () => {
    try {
      const obj = {username: username, password: password};
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
        setUser({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          username: username,
          email: res.email,
          phoneNumber : res.phoneNumber,
          aboutMe: res.aboutMe,
        });
        props.navigation?.navigate('Post-Login');
        // Navigate to Home screen
        setUsername('');
        setPassword('');
        setMessage('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const registerRedirect = () => {
    // Handle redirection to register screen here
    console.log('Redirecting to register screen');
    props.navigation.navigate('Register');
  };

  const resetPassword = () => {
    props.navigation.navigate('Request');
  }

  const handleLogout = () => {
    setUsername(''); // Clear username
    setPassword(''); // Clear password
    setMessage('') // Clear error message
  };

  // Render the login page if isLoggedIn is false
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
      <TouchableOpacity onPress={resetPassword}>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
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
  forgotPassword: {
    color: 'blue',
    fontSize: 18,
    marginBottom: 20,
    marginHorizontal: 75,
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