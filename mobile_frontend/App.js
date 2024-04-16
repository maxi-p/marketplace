/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {UserContext} from './logic/UserContext';
import {StyleSheet, Text, View} from 'react-native';

import ProductModal from './pages/Modals/newProductModal';
import ImageViewModal from './pages/Modals/ImageViewModal';
import SellUpdateProduct from './Components/SellUpdateProduct';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerifyPage from './pages/EmailVerifyPage';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import UserIDPage from './pages/UserIDPage';
import SettingsPage from './pages/SettingsPage';
import UserPage from './pages/UserPage';
import UserProductListPage from './pages/UserProductList';
import UsernamePage from './pages/UsernamePage';

const Stack = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
const Stack3 = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="eVerifyModel" component={EmailVerifyPage} />
          <Stack.Screen name="Request" component={UsernamePage} />
          <Stack.Screen name="Reset" component={UsernamePage} />
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
    <Drawer.Navigator
      initialRouteName="ProductList"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="ProductList"
        component={ProductPages}
        options={{
          title: 'View Products',
          drawerIcon: ({focused, color, size}) => {
            return <Entypo name="shopping-bag" color={color} size={size} />;
          },
        }}
      />
      <Drawer.Screen
        name="UserPList"
        component={UserProductPages}
        options={{
          title: 'Sell Products',
          drawerIcon: ({focused, color, size}) => {
            return <Entypo name="shopping-bag" color={color} size={size} />;
          },
        }}
      />
      <Drawer.Screen
        name="UserIDPage"
        component={UserIDPage}
        options={{
          unmountOnBlur: true,
          title: 'View Account',
          drawerIcon: ({focused, color, size}) => {
            return (
              <FontAwesome
                name={focused ? 'user-circle-o' : 'user'}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Drawer.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          drawerItemStyle: {display: 'none'},
        }}>
        <Drawer.Screen name="EditUser" component={SettingsPage} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

const UserProductPages = () => {
  return (
    <Stack3.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack3.Screen name="List" component={UserProductListPage} />
      <Stack3.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}>
        <Stack3.Screen name="ProductModal" component={ProductModal} />
        <Stack3.Screen name="SellerModal" component={UserPage} />
        <Stack3.Screen name="ImageModal" component={ImageViewModal} />
        <Stack3.Screen name="SellUpdateModal" component={SellUpdateProduct} />
      </Stack3.Group>
    </Stack3.Navigator>
  );
};

const ProductPages = () => {
  return (
    <Stack2.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="List" component={ProductListPage} />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}>
        <Stack.Screen name="ProductModal" component={ProductModal} />
        <Stack.Screen name="SellerModal" component={UserPage} />
        <Stack.Screen name="ImageModal" component={ImageViewModal} />
        <Stack.Screen name="SellUpdateModal" component={SellUpdateProduct} />
      </Stack.Group>
    </Stack2.Navigator>
  );
};

const CustomDrawer = props => {
  const {user, setUser} = useContext(UserContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.drawerHeaderView}>
        <View style={[style.row, style.titleRow]}>
          <Text style={[style.text, style.titleText]}>OM</Text>
          <Text style={[style.text, style.splashText]}>
            Welcome to Open Markert, {}
            <Text style={(style.text, style.splashText, style.usernameText)}>
              {user.username}
            </Text>
            !{'\n'}
            Have a Wonderful Day!
          </Text>
        </View>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Log out"
        onPress={() => {
          setUser(null);
          props.navigation.navigate('Login');
        }}
        icon={({focused, color, size}) => {
          return <MCIcon name="logout" color={color} size={size} />;
        }}
      />
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  drawerHeaderView: {
    borderBottomWidth: 3,
    width: '95%',
    alignSelf: 'center',
    paddingBottom: 5,
    marginBottom: 5,
  },

  row: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  titleRow: {},

  text: {
    color: 'black',
  },
  splashText: {},
  usernameText: {
    color: 'dimgray',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 30,
  },
});
export default App;
