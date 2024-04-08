import React from 'react';
import {AppRegistry, Appearance, Modal, View} from 'react-native';
import Search from './Components/SearchBar';
import ProductList from './Components/newProductList';
import ProductModal from './pages/Modals/newProductModal';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ImageViewModal from './pages/Modals/ImageViewModal';
import SellProduct from './Components/SellProduct';


const Stack = createNativeStackNavigator();
const App2 = () => {
  Appearance.setColorScheme('light');
  return (
    <View>
      <SellProduct />
    </View>
  );
};

const App = () => {
  Appearance.setColorScheme('light');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ProductList} />
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            headerShown: false,
          }}>
          <Stack.Screen name="ProductModal" component={ProductModal} />
          <Stack.Screen name="ImageModal" component={ImageViewModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App2;