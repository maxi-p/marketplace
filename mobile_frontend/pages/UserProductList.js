/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserProductList from '../Components/newProductList_User';

export default function UserProductListPage(props) {
    const onAddProductPress = () => {
        props.navigation.navigate('SellUpdateModal');
    };

    return (
        <View style={styles.background}>
            <UserProductList {...props} />
            <Pressable onPress={onAddProductPress} style={styles.addProductButton}>
                <FontAwesome name="pencil"
                    size={40}
                    color="black"
                />
            </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'mediumorchid',
    },
    addProductButton: {
        backgroundColor: '#AF9FC9',
        borderRadius: 50,
        borderWidth: 2,

        position: 'absolute',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems:'center',

        bottom: 15,
        right: 15,
    },
});
