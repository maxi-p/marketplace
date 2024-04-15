import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserContext} from './logic/UserContext';
import {Appearance} from 'react-native';

import ProductModal from './pages/Modals/newProductModal';
import ImageViewModal from './pages/Modals/ImageViewModal';
import SellUpdateProduct from './Components/SellUpdateProduct';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerifyPage from './pages/EmailVerifyPage';

import HomePage from './pages/HomePage';
import SellPage from './pages/SellPage';
import BrowsePage from './pages/BrowsePage';
const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen
            name="Post-Login"
            component={PostLogin}
            options={{headerShown: false}}
          />
          <Stack.Screen name="eVerifyModel" component={EmailVerifyPage} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

// <Tab.Screen name="Home" component={HomePage} />
// <Tab.Screen name="Sell" component={SellPage} />
// <Tab.Screen name="Browse" component={BrowsePage} />
const PostLogin = () => {
  return (
    <Stack2.Navigator initialRouteName="Home">
      <Stack.Screen name="List" component={ProductListPage} />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}>
        <Stack.Screen name="ProductModal" component={ProductModal} />
        <Stack.Screen name="ImageModal" component={ImageViewModal} />
        <Stack.Screen name="SellUpdateModal" component={SellUpdateProduct} />
      </Stack.Group>
    </Stack2.Navigator>
  );
};
export default App;
