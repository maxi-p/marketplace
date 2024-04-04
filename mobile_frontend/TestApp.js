import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Search from './Components/SearchBar';
import ProductList from './Components/newProductList';
const App = () => {
  return (
    <View>
      <ProductList />
    </View>
  );
};
export default App;
