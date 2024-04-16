/* eslint-disable prettier/prettier */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import UserComponent from '../Components/UserComponent';
import { UserContext } from '../logic/UserContext';
import { buildPath } from '../logic/NetworkLogic';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserPage = ({UserID, route, navigation, ...props}) => {

    const { user } = useContext(UserContext);
    const UID = UserID ?? route?.params?.UID ?? user.id ?? null;

    const [userData, setUserData] = useState(null);
    


    const editUser = () => {
        navigation.navigate('EditUser');
    };

    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        getUser(UID);
    }, [UID, getUser]);

    useEffect(() => {
        const Reload = navigation.addListener('focus', () => {
            if (UID == user.id){
                getUser(UID);
            }
        });
        return Reload;
    }, [UID, getUser, navigation, user.id]);


    const getUser = useCallback(async (userId) => {
        try {

        const response = await fetch(buildPath('api/getUser'), {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId }),
        });

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        } else {
            // setCurUsername(userData.user.username || '');
            // setCurFirstName(userData.user.firstname || '');
            // setCurLastName(userData.user.lastname || '');
            // setCurEmail(userData.user.email || '');
            // setCurPhoneNumber(userData.user.phoneNumber || '');
            // setCurAboutMe(userData.user.aboutme || '');
            console.log(JSON.stringify(result.user, null, 4));
            setUserData(result.user);
        }
        } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to fetch user data. Please try again.');
        navigation.goBack();
        }
    }, [navigation]);

    return (
        <View style={styles.background}>
            {userData && 
                <View style={{flex: 1}}>
                    <ScrollView>
                        <UserComponent
                            userData={userData}
                            goBack={goBack}
                        />
                    </ScrollView>
                    <Pressable onPress={editUser} style={styles.editUserButton}>
                        <FontAwesome name="pencil"
                            size={40}
                            color="black"
                        />
                    </Pressable>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({

    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'mediumorchid',
    },
    editUserButton: {
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
export default UserPage;
