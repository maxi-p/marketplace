/* eslint-disable prettier/prettier */
// Register Page created by Griffin Zakow on 03/21/24

import React from "react";
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
import RegisterComponent from "../Components/RegisterComponent";

export default function RegisterPage(props) {

    return (
        <ScrollView
            style={styles.container}
        >
            <RegisterComponent
                {...props}
            />
        </ScrollView>
    )};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'mediumorchid',
        width: '100%',
        height: '100%',
    },
});