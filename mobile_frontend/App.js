
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {

  /* Old Render
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        return <LoginPage />;
      // Add more cases/screens if needed
      case 'Home':
        return <HomePage />;
      default:
        return <LoginPage />;
    }
  };


  return renderScreen();
   */
// TODO: Secure Post-Login Pages
// TODO: Add Keyring and state to store credentials
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
