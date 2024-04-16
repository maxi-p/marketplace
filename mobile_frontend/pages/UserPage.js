/* eslint-disable prettier/prettier */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import UserComponent from '../Components/UserComponent';
import { UserContext } from '../logic/UserContext';
import { buildPath } from '../logic/NetworkLogic';

import IonIcons from 'react-native-vector-icons/Ionicons';

const UserPage = ({username, route, navigation, ...props}) => {

    const { user } = useContext(UserContext);
    const Uname = username ?? route?.params?.username ?? null;

    const [userData, setUserData] = useState(null);

    if (user.username == Uname) {
        navigation.goBack();
        navigation.navigate('UserIDPage');
    }

    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        getUser(Uname);
    }, [Uname, getUser]);


    const getUser = useCallback(async (UserName) => {
        const obj = {
            username: UserName,
        }
        console.log(JSON.stringify(obj,null,4));
        try {
        const response = await fetch(buildPath('api/searchUser'), {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }
        else if (result.results.length == 0) {
            throw new Error('No Users Returned');
        }
         else {
            // setCurUsername(userData.user.username || '');
            // setCurFirstName(userData.user.firstname || '');
            // setCurLastName(userData.user.lastname || '');
            // setCurEmail(userData.user.email || '');
            // setCurPhoneNumber(userData.user.phoneNumber || '');
            // setCurAboutMe(userData.user.aboutme || '');
            console.log(JSON.stringify(result.results[0], null, 4));
            setUserData(result.results[0]);
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
                {/* Back Button */}
                <Pressable style={styles.backButton}
                onPress={() => navigation.goBack()}
                >
                    <IonIcons name="arrow-back" size={30} color="black"/>
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
    backButton: {
        backgroundColor: 'lavender',
        position: 'absolute',
        top: 5,
        left: 5,
        borderRadius: 50,
        borderWidth: 1,
        color: 'black',
    }
});
export default UserPage;
