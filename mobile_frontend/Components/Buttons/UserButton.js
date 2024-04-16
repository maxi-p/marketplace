/* eslint-disable prettier/prettier */
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const UserButton = ({seller, onPress, navigation, route, ...props}) => {

    const tempImage = require('../../Images/User_Icon_Placeholder.jpg');
    const NavUserPage =  () => {
        if (navigation) {
            navigation.navigate('SellerModal', {
                username: seller,
            });
        };
    };

    const ButtonPress = onPress ?? NavUserPage;

    return (
        <Pressable onPress={ButtonPress}
            style={styles.sellerBox}
            android_ripple={{
                color :'gray',
                foreground: true,
            }}>
            <View style={styles.sellerImage}>
                <FAIcon name="user" size={30} color="black" />
            </View>
            <Text style={styles.text}
            numberOfLines={1}
            >
                {seller ?? 'N/A'}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 17,
        paddingHorizontal: 5,
        maxWidth: "80%"
    },

    sellerImage: {
        width: 40,
        height: 40,
        borderWidth: 0,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 500,
    },

    sellerBox: {
        backgroundColor: 'lavender',
        borderWidth: 1,
        borderRadius: 50,

        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

});
export default UserButton;