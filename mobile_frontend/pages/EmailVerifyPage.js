/* eslint-disable prettier/prettier */
import VerifyComp from '../Components/EmailVerifyComp';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

const EmailVerifyPage = ({navigation, route, UserID}) => {
    const ID = UserID ?? route?.params?.UserID ?? null;

    if (UserID === null) {
        Alert.alert('No Id Provided');
        navigation.goBack();
    }
    return (
        <View style={styles.Background}>
            <VerifyComp UserID={ID} navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    Background: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'mediumorchid',
        width: '100%',
        height: '100%',
    },
});
export default EmailVerifyPage;
