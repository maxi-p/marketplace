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
  Pressable, 
} from "react-native"; 

function ProductItem({item, onPress}) {
  const staticImage = require("../Images/PlaceHolder.png");
  return (
    <View style={styles.itemContainer}>
      <Pressable 
        onPress={() => {onPress(item)}}
        android_ripple={{
          color:"gray",
          foreground: true,
        }}
      >
        <Image source={staticImage} style={styles.image} />
        <View style={{ padding: 10, }}>
          <View style ={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.itemTitle}>{item.name ?? "N/A"}</Text>
            <Text style={styles.itemPrice}>{item.price ?? "$??"}</Text>
          </View>
          <Text style={styles.itemDesc} numberOfLines={3}>
          {item.desc ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " + 
          "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
          "veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " + 
          "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " + 
          "dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, " +
          "sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
          
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

function ProductList({data, onItemPress}) {
  function renderProduct({item}) {
    return (
      <ProductItem item={item} onPress={(item) => {onItemPress(item)}} />
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      style={{width: "100%"}}
      flex={1}
      />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    color: "black",
    width: "100%"
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
  itemDesc: {
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})
export default ProductList;