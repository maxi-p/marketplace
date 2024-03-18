import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

function buildPath(route) {
    const app_name = 'cop4331-marketplace-98e1376d9db6';
    return 'https://' + app_name + '.herokuapp.com/' + route;
}

function Login() {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');

    const doLogin = async () => {
        try {
            const obj = { username: loginName, password: loginPassword };
            const js = JSON.stringify(obj);
            const response = await fetch(buildPath('api/login'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });
            const res = await response.json();

            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            } else {
                const user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
                // Replace localStorage with AsyncStorage for React Native
                // AsyncStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                // Redirect to home screen in React Native
                // Replace window.location.href with navigation.navigate
                // navigation.navigate('Home');
                Alert.alert('Login Successful');
            }
        } catch (e) {
            Alert.alert('Error', e.toString());
        }
    };

    const registerRedirect = () => {
        // Redirect to register screen in React Native
        // Replace window.location.href with navigation.navigate
        // navigation.navigate('Register');
        Alert.alert('Redirect to Register Screen');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>PLEASE LOG IN</Text>
            <TextInput
                placeholder="Username"
                value={loginName}
                onChangeText={setLoginName}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={loginPassword}
                onChangeText={setLoginPassword}
            />
            <Button title="Do It" onPress={doLogin} />
            <Button title="Register" onPress={registerRedirect} />
            <Text>{message}</Text>
        </View>
    );
}

export default Login;
