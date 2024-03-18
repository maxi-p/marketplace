// FileName: App.js 

// TODO add Comments
// TODO Move to new File
// TODO Expand Image when Pressed
import React, { useState } from "react"; 
import { 
	View, 
	StyleSheet,
  Button,
} from "react-native"; 
import ProductModal from "./Components/ProductModal";



function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ProductModal visible={modalVisible}
        close={() => setModalVisible(false)}
      />
      <Button
        title="Open Modal"
        onPress={() => {setModalVisible(true)}}
      />
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
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    margin:30,
  },
});
export default App;
