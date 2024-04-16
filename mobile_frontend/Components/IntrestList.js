/* eslint-disable prettier/prettier */
import { buildPath } from '../logic/NetworkLogic';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const IntrestList = ({UserIDs, style, ...props}) => {
    // Functions
    const renderItem = ({item}) => {
        return (
            <IntrestCard UserID={item} />
        );
    };

    return (
        <View style={[styles.container, style]}>
            <FlatList
                data={UserIDs}
                renderItem={renderItem}
            />
        </View>
    );
};



const IntrestCard = ({UserID, containterStyle, ...props}) => {

    // States
    const [UserInfo, SetUserInfo] = useState(null);
    // Functions
    const openEmail = () => {
        if (!UserInfo?.email) {
            return;
        }
        else {
            const URL = `mailto:${UserInfo.email}`;
            Linking.openURL(URL);
        }
    };

    const openPhone = () => {
        if (!UserInfo?.phoneNumber) {
            return;
        }
        else {
            const URL = `tel:${UserInfo.phoneNumber}`;
            Linking.openURL(URL);
        }
    };

    // Effects and Callbacks
    useEffect(() => {
        if (UserID) {
            const Info = getUserData(UserID);
            Info.then((Data) => {
                SetUserInfo(Data);
            });
        }
    }, [UserID, getUserData]);

    // Get User Info From UserID
    const getUserData = useCallback(async (UserID) => {
        var obj = {
            userId: UserID,
        };
        var js = JSON.stringify(obj);
        try {
            console.log('Getting User');
            const result = await fetch(buildPath('api/getUser'),
            {
                method: 'POST',
                body: js,
                headers:{'Content-Type': 'application/json'},
            });

            console.log(JSON.stringify(result, null, 4));
            const response = JSON.parse(await result.text());
            console.log(JSON.stringify(response, null, 4));

            if (response.error){
                throw new Error(response.error);
            }
            console.log('Finished Getting User');
            return response.user;
        }
        catch (e) {
            console.error(e.toString());
            Alert.alert(e.toString());
        }

      },
      [],
    );


    // Visual
    return (
        <View style={[styles.innerContainer, containterStyle]}>
            {/* NameRow  */}
            <View style={[styles.row, styles.nameRow]}>
                <Text style={[styles.text, styles.nameText]}>
                    {
                        (UserInfo?.firstname && UserInfo.lastname) ?
                         `${UserInfo.firstname} ${UserInfo.lastname}` :
                         'N/A'
                    }
                </Text>
            </View>
            {/* Phone Number */}
            <Pressable style={[styles.row, styles.phoneRow]}
                onPress={openPhone}
            >
                <View style={[styles.icon, styles.phoneIcon]}>
                    <FontAwesome name="phone" size={30} color="black"/>
                </View>
                <Text style={[styles.text, styles.phoneText]}>
                    {
                         (UserInfo?.phoneNumber) ?
                            `(${UserInfo.phoneNumber.slice(0,3)}) ${UserInfo.phoneNumber.slice(3,6)}-${UserInfo.phoneNumber.slice(6)}` :
                            'N/A'
                    }
                </Text>
            </Pressable>
            {/* Email */}
            <Pressable style={[styles.row, styles.emailRow]}
                onPress={openEmail}
            >

                <View style={[styles.icon, styles.emailIcon]}>
                    <MatComIcon name="email-send" size={30} color="black" />
                </View>
                <Text style={[styles.text, styles.emailText]}>
                    {
                         (UserInfo?.email) ?
                            UserInfo.email :
                            'N/A'
                    }
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lavender',
        borderRadius: 20,
        maxHeight: 180
    },
    innerContainer: {
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 30,
    },
    nameRow: {
        justifyContent: 'center',
    },
    phoneRow: {},
    emailRow: {},

    text: {
        color: 'black',
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    phoneText: {
        marginLeft: 0,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    emailText: {
        marginLeft: 0,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },

    icon: {
        height:30,
        width: 35,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneIcon: {},
    emailIcon: {},

});
export default IntrestList;
