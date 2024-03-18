// TODO Add Comments
// TODO Expand Image WHen Pressed
// TODO Add User Icons from components

import React, { useState } from "react"; 
import { 
	View, 
	Text, 
	TouchableOpacity, 
	FlatList, 
	StyleSheet,
  Image,
  Modal,
  Button,
  Pressable,
  ImageBackground,
  Alert, 
} from "react-native"; 


function ProductModal({item, visible, close}) {
  const tempImage = require("../Images/PlaceHolder.png")
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={close}
      >
      {/* Image and back button*/}
      <View style={styles.modalView}>
        <Image source={tempImage} style={styles.image} />
        <View style={styles.backIcon}>
          <Pressable onPress={close}>
            <Text >Back(ICON)</Text>
          </Pressable>
        </View>
        {/* Price and name*/}
        <View style={[styles.defaultRow, styles.itemNameRow]}>
          <Text style={styles.itemTitle}>{item?.name ?? "N/A"}</Text>
          <Text style={styles.itemPrice}>{item?.price ?? "$??"}</Text>
        </View>
        {/*Seller Row */}
        <View style={[styles.defaultRow, styles.sellerRow]}>
          <Text> Sold by: </Text>
          <Text> TODO: User Icon</Text>
        </View>
        {/*Description Row */}
        <View style={[styles.defaultRow, styles.descRow]}>
          <Text style={styles.itemDesc}>
          {item?.desc ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " + 
          "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
          "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " + 
          "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " + 
          "dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, " +
          "sunt in culpa qui officia deserunt mollit anim id est laborum."
          } </Text>
        </View>
        {/*Button Row */}
        <View style={[styles.defaultRow, styles.buttonRow]}>
          <Button 
            onPress={()=>{Alert.alert("Button Pressed")}}
            title="I'm Interested"
            color={"green"}
            disabled
          />
        </View>
      </View>
      
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    margin: 20,
    elevation: 2,
    width: "auto",
    height: "60%",
    
  },
  backIcon: {
    position: "absolute",
    left: "5%", 
    top: "2%",
  },
  image: {
    height: '20%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    resizeMode: 'cover',
    overflow: "hidden",
  },
  defaultRow: {
    flexDirection: "row", 
    justifyContent: "space-between",
    padding: 10,
  },
  itemNameRow: {
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  itemPrice: {
    fontSize: 20,
    color: "gray"
  },
  sellerRow: {

  },
  buttonRow:
  {
    position: "absolute",
    bottom: ".25%",
    alignSelf: "center"
  },
});
export default ProductModal;