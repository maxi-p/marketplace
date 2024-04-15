
import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SellPage from './pages/SellPage';
import BrowsePage from './pages/BrowsePage';
import UserPage from './pages/UserPage';
import UsernamePage from './pages/UsernamePage';
import PasswordResetPage from './pages/PasswordResetPage';
import { UserContext } from './logic/UserContext';
import SettingsPage from './pages/SettingsPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const [user, setUser] = useState(null);
  const UserC = {user, setUser};

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
    <UserContext.Provider value={UserC}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Post-Login" component={PostLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Reset" component={PasswordResetPage} />
        <Stack.Screen name="Request" component={UsernamePage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
      </Stack.Navigator>
    </UserContext.Provider>
    </NavigationContainer>
  );
};


const PostLogin = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Sell" component={SellPage} />
      <Tab.Screen name="Browse" component={BrowsePage} />
      <Tab.Screen name="User" component={UserPage} />
    </Tab.Navigator>
  );
}
export default App;