/* eslint-disable prettier/prettier */
import React from "react";
import { Image, Pressable, StyleSheet, Text } from 'react-native';

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
            <Image source={tempImage} style={styles.sellerImage} />
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
        borderRadius: 50,
    },

    sellerBox: {
        backgroundColor: 'lavender',
        borderWidth: 0.8,
        borderRadius: 50,

        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

});
export default UserButton;