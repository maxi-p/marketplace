import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';


const PasswordResetPage = ( {route} ) => {

    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        setUsername(route.params.username || '');
    }, [route.params.username]);

    const handlePasswordChange = async () => {
        try {
            // Call the passwordChange function
            const response = await passwordChange(username, code, newPassword);
            // Handle successful password change here if needed
        } catch (error) {
            // Handle errors here
            Alert.alert('Error', error.message);
        }
    };

    const passwordChange = async (username, verificationNumber, newPassword) => {
        try {
            const response = await fetch(`https://cop4331-marketplace-98e1376d9db6.herokuapp.com/api/passwordChange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    verificationNumber: verificationNumber,
                    newPassword: newPassword
                })
            });
    
            const responseData = await response.json();
    
            if (response.status === 200) {
                // Password changed successfully
                console.log('Password changed successfully');
                return responseData; // You might want to return some data here
            } else if (response.status === 404) {
                // User not found in the database
                throw new Error('User is not in Database');
            } else if (response.status === 400) {
                // Verification number doesn't match database
                throw new Error('Verify Num doesn\'t match Database');
            } else {
                // Handle other status codes as needed
                throw new Error('Unexpected error occurred');
            }
        } catch (error) {
            console.error('Error changing password:', error.message);
            throw new Error('Failed to change password. Please try again.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>We've sent a reset code to your email Please enter the following information</Text>
          <Text style={styles.text}>Verification Code</Text>
            <TextInput
            style={styles.input}
            placeholder=""
            value={code}
            onChangeText={setCode}
          />
          <Text style={styles.text}>New Password</Text>
            <TextInput
            style={styles.input}
            placeholder=""
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
            <Text style={styles.buttonText}>Reset Password</Text>
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
});

export default PasswordResetPage;