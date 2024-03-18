import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './Pages/LoginPage';
import CardPage from './Pages/CardPage';
import RegisterPage from './Pages/RegisterPage';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Cards" component={CardPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={TempHomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
