// FileName: App.js 

// TODO add Comments
// TODO Move to new File
// TODO Expand Image when Pressed
import React, { useState } from "react"; 
import { 
	View, 
	StyleSheet,
  Button,
  Alert,
} from "react-native"; 
import ProductModal from "./Components/ProductModal";
import ProductList from "./Components/ProductList";



function App() {
  const [modalItem, setModalitem] = useState(null);
    const data = [
      {
        id:1,
        name: "Hello1",
        price: "$50",
        desc: "Test"
      },
      {
        id:2,
        name: "Hello2",
        price: "$5000",
        desc: "This is also a Test"
      },
      {
        id:3,
        name: "Greetings",
        price: "$5.00",
      },
      {
        id:4,
        name: "Goo Dragon",
        price: "$Goo",
        desc: "hello THis is a test"
      },
    ];
  return (
    <View style={styles.container}>
      <ProductModal visible={modalItem != null}
        close={() => setModalitem(null)}
        item={modalItem}
        />
      <ProductList data={data} onItemPress={(item) => {setModalitem(item)}}/>
    </View>
  );
};

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
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    margin:10,
  },
});
export default App;
