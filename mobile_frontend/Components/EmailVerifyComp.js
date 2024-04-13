/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { buildPath } from '../logic/NetworkLogic';

const VerifyComp = ({UserID, navigation, ...props}) => 
{
    const ID = UserID ?? null;
    // States
    const [VerifyNum, setVerifyNum] = useState(0);


    // Functions
    const Submit = async (VerifyN) => {
        const js = JSON.stringify({
            id: ID,
            verifyNum: VerifyN,
        });
        try {
            const result = await fetch(buildPath('api/emailVerify'),
                {
                    method: 'POST',
                    body:js,
                    headers:{'Content-Type': 'application/json'},
                });
            const response = JSON.parse(await result.text());
            console.log(JSON.stringify(response, null, 4));
            if (response.error){
                throw new Error(response.error);
            }
            Alert.alert('Registration Complete');
            navigation.navigate('Login');
        }
        catch (e) {
            console.error(e.toString());
            Alert.alert(e.toString());
            return null;
        }
        finally {
            console.log('Finished');
        }

    };

    // Component
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior='padding'
        >
            <View style={[styles.row, styles.titleRow]}>
                <Text style={[styles.text, styles.titleText]}>
                    Enter Verification Number:
                </Text>
            </View>
            <View style={[styles.row, styles.tBoxRow]}>
                <TextInput
                    numberOfLines={1}
                    maxLength={5}
                    keyboardType="numeric"

                    onChangeText={(text) => setVerifyNum(text.replace(/[^0-9]/g, ''))}
                    value={VerifyNum}
                    style={styles.TextBox}

                    placeholder='00000'
                />
            </View>
            <View style={[styles.row, styles.ButtonRow]}>
                <Button
                    title="Verify Email"
                    onPress={() => Submit(VerifyNum)}
                    disabled={!VerifyNum || VerifyNum.toString().length != 5}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'floralwhite',
        width: '95%',
        height: '70%',

        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',

    },

    row: {
        flex: 1,
    },
    titleRow: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tBoxRow: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonRow: {
        width: '70%' 
     },

    text: {},
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    TextBox: {
        borderWidth: 2,
        width: '90%',
        minWidth: 200,
        backgroundColor :"#f8dbf9",
        textAlign: 'center',
        fontSize: 24,
        borderRadius: 40,

    },

});


export default VerifyComp;
