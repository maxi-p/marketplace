// FileName: App.js 

// TODO add Comments
// TODO Move to new File
import React, { useState } from "react"; 
import { 
	View, 
	Text, 
	TouchableOpacity, 
	FlatList, 
	StyleSheet,
  Image, 
} from "react-native"; 

import ProductList from "./Components/ProductList";

function App() {
  const data = [
    {
      id:1,
      name:'Hello',
      price:"$50",
    },
    {
      id:2,
      name:'Hello2',
      price:"$750",
    },
    {
      id:3,
      price:"$50",
      desc: "This is when the name is removed",
    },
    {
      id:4,
      name:'Hello2',
      desc: "This is when the Price is removed"
    }
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Header
      </Text>
      <ProductList data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "green"
  },
  container: {
    flex:1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
})
export default App;
