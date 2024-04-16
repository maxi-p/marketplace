/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { UserContext } from '../logic/UserContext';
import R_Validation_Data from '../logic/RegisterValidation';
import { buildPath } from '../logic/NetworkLogic';
import IonIcons from 'react-native-vector-icons/Ionicons';

const SettingsPage = ({navigation, ...props}) => {
  const { user, setUser } = useContext(UserContext);
  const [curUsername, setCurUsername] = useState('');
  const [curPassword, setCurPassword] = useState('');
  const [curFirstName, setCurFirstName] = useState('');
  const [curLastName, setCurLastName] = useState('');
  const [curEmail, setCurEmail] = useState('');
  const [curPhoneNumber, setCurPhoneNumber] = useState('');
  const [curAboutMe, setCurAboutMe] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newAboutMe, setNewAboutMe] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');


  useEffect(() => {
    getUser();
  }, [getUser]);

  const getUser = useCallback( async () => {
    try {
      const response = await fetch(buildPath('api/getUser'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),

      });

      const userData = await response.json();

      if (userData.error) {
        throw new Error(userData.error);
      } else {
        // Update state with user data
        setCurUsername(userData.user.username || '');
        setCurFirstName(userData.user.firstname || '');
        setCurLastName(userData.user.lastname || '');
        setCurEmail(userData.user.email || '');
        setCurPhoneNumber(userData.user.phoneNumber || '');
        setCurAboutMe(userData.user.aboutme || '');
        setNewUsername(userData.user.username || '');
        setNewPassword('');
        setNewFirstName(userData.user.firstname || '');
        setNewLastName(userData.user.lastname || '');
        setNewEmail(userData.user.email || '');
        setNewPhoneNumber(userData.user.phoneNumber || '');
        setNewAboutMe(userData.user.aboutme || '');
        console.log(user.id);
        console.log('userData: ', userData.user.username);
        console.log('userData: ', userData.user.firstname);
        console.log('userData: ', userData.user.lastname);
        console.log('userData: ', userData.user.email);
        console.log('userData: ', userData.user.phoneNumber);
        console.log('userData: ', userData.user.aboutme);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', 'Failed to fetch user info. Please try again.');
    }
  }, [user.id]);

  console.log('curUsername: ', curUsername);
  console.log('curPassword: ', curPassword);
  console.log('curFirstName: ', curFirstName);
  console.log('curLastName: ', curLastName);
  console.log('curEmail: ', curEmail);
  console.log('curPhoneNumber: ', curPhoneNumber);
  console.log('curAboutMe: ', curAboutMe);

  console.log('newUsername: ', newUsername);
  console.log('newPassword: ', newPassword);
  console.log('newFirstName: ', newFirstName);
  console.log('newLastName: ', newLastName);
  console.log('newEmail: ', newEmail);
  console.log('newPhoneNumber: ', newPhoneNumber);
  console.log('newAboutMe: ', newAboutMe);

  const editUser = async () => {
      if (!validatePassword(newPassword)) {
        if (newPassword != '') {
          setPasswordError('Password must be 8-32 characters long, with at least 1 digit, 1 letter, and 1 special character');
          return;
        }
      }
    //}

    if (!validateUsername(newUsername)) {
      setUsernameError('Username must be 4-18 characters (Alphanumeric, -, _) and start with a character');
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError('Improper email format');
      return;
    }

    if (!validatePhoneNumber(newPhoneNumber)) {
      setPhoneNumberError('Improper phone number format');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('id', user.id);
      formData.append('firstName', newFirstName);
      formData.append('lastName', newLastName);
      formData.append('username', newUsername);
      formData.append('password', newPassword);
      formData.append('email', newEmail);
      formData.append('phoneNumber', newPhoneNumber);
      formData.append('aboutMe', newAboutMe);
      // formData.append('image', userData.image); // Will hopefully get to this

      const response = await fetch(buildPath('api/editUser'), {
        method: 'POST',
        body: formData,
      });

      const responseData = JSON.parse(await response.text());
      
      console.log('Response\n' + JSON.stringify(responseData, null, 4));
      if (responseData.error) {
        setUser({...user,
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
          username: newUsername,
        });
        throw new Error(responseData.error);
      } else {
        setUsernameError('');
        setPasswordError('');
        setEmailError('');
        setPhoneNumberError('');
        console.log('User Info Updated Successfully');
        Alert.alert('Info Updated Successfully');
        return responseData;
      }
    } catch (error) {
      console.error('Error editing user:', error);
      throw new Error('Failed to edit user. Please try again.');
    }
  };

  const validatePassword = (password) => {
    return R_Validation_Data.passwordRegex.test(password);
  };

  const validateUsername = (username) => {
    return R_Validation_Data.userNameRegex.test(username);
  };

  const validateEmail = (email) => {
    if (email == null) {
      return false;
    }
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    return emailRegex.test(email.toString());
  };

  const validatePhoneNumber = (phoneNumber) => {
    return R_Validation_Data.phoneRegex.test(phoneNumber);
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.outer}>
        <KeyboardAvoidingView style={styles.inner}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Pressable style={styles.backButton}
              onPress={() => navigation.navigate('UserIDPage')}
              >
                <IonIcons name="arrow-back" size={35} color="black"/>
              </Pressable>
              <Text style={[styles.text, styles.title]}>Account Settings</Text>
              <Text style={[styles.text, styles.labelText]}>Username</Text>
              <TextInput
                style={[styles.input, usernameError && styles.errorInput]}
                placeholder={curUsername}
                value={newUsername}
                onChangeText={setNewUsername}
              />
              {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
              <Text style={[styles.text, styles.labelText]}>Password</Text>
              <TextInput
                style={[styles.input, passwordError && styles.errorInput]}
                placeholder=""
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              <Text style={[styles.text, styles.labelText]}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder={curFirstName}
                value={newFirstName}
                onChangeText={setNewFirstName}
              />
              <Text style={[styles.text, styles.labelText]}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder={curLastName}
                value={newLastName}
                onChangeText={setNewLastName}
              />
              <Text style={[styles.text, styles.labelText]}>Email</Text>
              <TextInput
                style={[styles.input, emailError && styles.errorInput]}
                placeholder={curEmail}
                value={newEmail}
                onChangeText={setNewEmail}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              <Text style={[styles.text, styles.labelText]}>Phone Number</Text>
              <TextInput
                style={[styles.input, phoneNumberError && styles.errorInput]}
                placeholder={curPhoneNumber}
                value={newPhoneNumber}
                onChangeText={setNewPhoneNumber}
              />
              {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
              <Text style={[styles.text, styles.labelText]}>About Me</Text>
              <TextInput
                style={[styles.input, styles.aboutMeInput]}
                placeholder={curAboutMe}
                value={newAboutMe}
                onChangeText={setNewAboutMe}
                multiline
                numberOfLines={5}
              />
              <View style={styles.button}>
                <Button
                  onPress={editUser}
                  title="Update"
                  color="mediumslateblue"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'mediumorchid',
    width: '100%',
    height: '100%',
  },
  outer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: 'floralwhite',
    color: 'black',
    width: '95%',
    marginTop: '25%',
    marginBottom: '25%',
    borderWidth: 1,
    borderRadius: 25,
    paddingTop: 10,
  },

  text: {
    color: 'black',
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  labelText: {
    marginTop:10,
    alignSelf: 'center', // Align text to the left
  },
  input: {
    height:40,
    margin:12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  aboutMeInput: {
    height: 20 * 5 + 20,
    textAlignVertical: 'top',
  },
  errorInput: {
    color: 'red',
    borderColor: 'red',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  backButton: {
      backgroundColor: 'lavender',
      position: 'absolute',
      left: 10,
      borderRadius: 50,
      borderWidth: 1,
      color: 'black',
  },
});

export default SettingsPage;
