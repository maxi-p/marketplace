/* eslint-disable prettier/prettier */
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';

const ImageViewModal = ({route, navigation}) => {
  const tempImage = require('../../Images/PlaceHolder.png');

  const pic = route?.params.image ?? tempImage;
  const goBack = () => {
    if (navigation) {
        navigation.goBack();
        return;
    }
    Alert.alert('goBack');
    console.log('goBack');
  }
  return (

    <View style={styles.container}>
        <Pressable style={styles.pressable}
            onPress={goBack}
        >
            <Image source={pic} style={styles.image} />
        </Pressable>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    pressable: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
export default ImageViewModal;