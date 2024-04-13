import React, {useState} from 'react';
import {AppRegistry, Appearance, Modal, View} from 'react-native';
import Search from './Components/SearchBar';
import ProductList from './Components/newProductList';
import ProductModal from './pages/Modals/newProductModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ImageViewModal from './pages/Modals/ImageViewModal';
import {UserContext} from './logic/UserContext';
import SellUpdateProduct from './Components/SellUpdateProduct';
import ProductListPage from './pages/ProductListPage';
import IntrestList from './Components/IntrestList';

const Stack = createNativeStackNavigator();

const App2 = () => {
  Appearance.setColorScheme('light');
  return (
    <View>
      <IntrestList />
    </View>
  );
};

const App = () => {
  const [user, setUser] = useState({
    id: 1,
    firstName: 'Griz',
    lastName: 'Zack',
    username: 'GzTest',
    email: 'test@test.gmail.com',
  });
  const UserC = {user, setUser};

  Appearance.setColorScheme('light');
  return (
    <NavigationContainer>
      <UserContext.Provider value={UserC}>
        <Stack.Navigator>
          <Stack.Screen name="List" component={ProductListPage} />
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
              headerShown: false,
            }}>
            <Stack.Screen name="ProductModal" component={ProductModal} />
            <Stack.Screen name="ImageModal" component={ImageViewModal} />
            <Stack.Screen
              name="SellUpdateModal"
              component={SellUpdateProduct}
            />
          </Stack.Group>
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};
export default App;
