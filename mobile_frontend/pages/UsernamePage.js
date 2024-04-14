import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';


const UsernamePage = (props) => {

    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const passwordRequest = async (username) => {
        try {
            const response = await fetch('https://cop4331-marketplace-98e1376d9db6.herokuapp.com/api/passwordRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                }),
            });
    
            console.log('Response:', response); // Log the response
            props.navigation.navigate('Reset', { username: username });
    
            const data = await response.json();
    
            if (response.ok) {
                // If response is successful
                props.navigation.navigate('Reset', { username: username });
            } else {
                // If response is not successful
                setMessage(data.error); // Display error message
            }
        } catch (error) {
            // If an error occurs during the fetch operation
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.'); // Display generic error message
            props.navigation.navigate('Reset', { username: username });
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Enter your username and we'll send a verification code to your email</Text>
            <Text style={styles.text}>Username</Text>
            <TextInput
            style={styles.input}
            placeholder=""
            value={username}
            onChangeText={setUsername}
          />
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity style={styles.button} onPress={() => passwordRequest(username)}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        padding: 20,
      },
      topText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
        marginBottom: 50,
        marginVertical: 0,
        textAlign: 'center',
      },
      text: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'flex-start', // Align text to the left
      },
      input: {
        width: '100%',
        height: 50,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingLeft: 10,
      },
      button: {
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
      message: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
      },
});

export default UsernamePage;