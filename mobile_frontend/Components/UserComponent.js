/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserComponent = ({userData, goBack, ...props}) => {

  if (userData === null) {
    goBack();
  }

    const openEmail = () => {
        if (!userData?.email) {
            return;
        }
        else {
            const URL = `mailto:${userData.email}`;
            Linking.openURL(URL);
        }
    };

    const openPhone = () => {
        if (!userData?.phoneNumber) {
            return;
        }
        else {
            const URL = `tel:${userData.phoneNumber}`;
            Linking.openURL(URL);
        }
    };


  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={[styles.row, styles.titleRow]}>
          <Text style={[styles.text, styles.titleText]}>{userData.username ?? 'N/A'}'s Information</Text>
        </View>
        <View style={[styles.row, styles.usernameRow]}>
          <Text style={[styles.text, styles.label, styles.usernameLabel]}>Username</Text>
          <Text style={[styles.text, styles.value, styles.usernameValue]}>
            {userData.username}
          </Text>
        </View>
        <View style={[styles.row, styles.nameRow]}>
          <Text style={[styles.text, styles.label, styles.nameLabel]}>Name</Text>
          <Text style={[styles.text, styles.value, styles.nameValue]}>
            {(userData.firstname ?? 'N/A') + ' ' + (userData.lastname ?? 'N/A')}
          </Text>
        </View>
        <View style={[styles.row, styles.emailRow]}>
          <Text style={[styles.text, styles.label, styles.emailLabel]}>Email</Text>
            <Pressable style={styles.pressable} onPress={openEmail}>

                <View style={[styles.icon, styles.emailIcon]}>
                    <MatComIcon name="email-send" size={30} color="black" />
                </View>
                <Text style={[styles.text, styles.value, styles.emailValue]}>
                    {
                         (userData?.email) ?
                            userData.email :
                            'N/A'
                    }
                </Text>
            </Pressable>
        </View>
        <View style={[styles.row, styles.phoneRow]}>
          <Text style={[styles.text, styles.label, styles.phoneLabel]}>Phone Number</Text>
            <Pressable style={styles.pressable} onPress={openPhone} >
                <View style={[styles.icon, styles.phoneIcon]}>
                  <FontAwesome name="phone" size={30} color="black"/>
                </View>
                <Text style={[styles.text, styles.value, styles.phoneValue]}>
                  {
                    (userData?.phoneNumber) ?
                      `(${userData.phoneNumber.slice(0,3)}) ${userData.phoneNumber.slice(3,6)}-${userData.phoneNumber.slice(6)}` :
                      'N/A'
                  }
                </Text>
            </Pressable>
        </View>
        <View style={[styles.row, styles.descRow]}>
          <Text style={[styles.text, styles.label, styles.descLabel]}>About Me</Text>
          <Text style={[styles.text, styles.value, styles.descValue]}>
            {userData.aboutMe}
          </Text>
        </View>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  root: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'floralwhite',
    color: 'black',
    width: '95%',
    marginTop: '25%',
    marginBottom: '25%',
    borderWidth: 1,
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },

  row: {
    marginBottom: 10,
  },
  titleRow: {},
  usernameRow: {},
  nameRow: {},
  emailRow: {},
  phoneRow: {},
  descRow: {},

  text:{
    color: 'black',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontWeight: 'bold',
  },
  usernameLabel: {},
  nameLabel: {},
  emailLabel: {},
  phoneLabel: {},
  descLabel: {},

  value: {
    marginLeft: 15,
  },
  usernameValue: {},
  nameValue: {},
  emailValue: {
    marginLeft: 0,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  phoneValue: {
    marginLeft: 0,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  descValue: {},

  icon: {
      height:30,
      width: 35,
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center',
  },
  phoneIcon: {},
  emailIcon: {},

  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 30,
  },
});

export default UserComponent;
