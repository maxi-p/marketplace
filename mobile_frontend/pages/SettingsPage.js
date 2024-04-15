import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { UserContext } from '../logic/UserContext';
import R_Validation_Data from "../logic/RegisterValidation";

const SettingsPage = () => {
  const { user } = useContext(UserContext);
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
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch(`https://cop4331-marketplace-98e1376d9db6.herokuapp.com/api/getUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })

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
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', 'Failed to fetch user info. Please try again.');
    }
  };
  // Debugging logs
  // console.log("curUsername: ", curUsername);
  // console.log("curPassword: ", curPassword);
  // console.log("curFirstName: ", curFirstName);
  // console.log("curLastName: ", curLastName);
  // console.log("curEmail: ", curEmail);
  // console.log("curPhoneNumber: ", curPhoneNumber);
  // console.log("curAboutMe: ", curAboutMe);

  // console.log("newUsername: ", newUsername);
  // console.log("newPassword: ", newPassword);
  // console.log("newFirstName: ", newFirstName);
  // console.log("newLastName: ", newLastName);
  // console.log("newEmail: ", newEmail);
  // console.log("newPhoneNumber: ", newPhoneNumber);
  // console.log("newAboutMe: ", newAboutMe);

  const editUser = async () => {
      if (!validatePassword(newPassword)) {
        if (newPassword != '') {
          setPasswordError('Password must be 8-32 characters long, with at least 1 digit, 1 letter, and 1 special character');
          return;
        }
      }

    if (!validateUsername(newUsername)) {
      setUsernameError("Username must be 4-18 characters (Alphanumeric, -, _) and start with a character");
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError("Improper email format");
      return;
    }

    if (!validatePhoneNumber(newPhoneNumber)) {
      setPhoneNumberError("Improper phone number format");
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
  
      const response = await fetch('https://cop4331-marketplace-98e1376d9db6.herokuapp.com/api/editUser', {
        method: 'POST',
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (responseData.error) {
        throw new Error(responseData.error);
      } else {
        setUsernameError('');
        setPasswordError('');
        setEmailError('');
        setPhoneNumberError('');
        console.log("User Info Updated Successfully");
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
  }

  const validateEmail = (email) => {
    if (email == null) {
      return false;
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    return emailRegex.test(email.toString());
  }

  const validatePhoneNumber = (phoneNumber) => {
    return R_Validation_Data.phoneRegex.test(phoneNumber);
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Account Settings</Text>
          <Text style={styles.labelText}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder={curUsername}
            value={newUsername}
            onChangeText={setNewUsername}
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          <Text style={styles.labelText}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder={curFirstName}
            value={newFirstName}
            onChangeText={setNewFirstName}
          />
          <Text style={styles.labelText}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder={curLastName}
            value={newLastName}
            onChangeText={setNewLastName}
          />
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder={curEmail}
            value={newEmail}
            onChangeText={setNewEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <Text style={styles.labelText}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder={curPhoneNumber}
            value={newPhoneNumber}
            onChangeText={setNewPhoneNumber}
          />
          {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
          <Text style={styles.labelText}>About Me</Text>
          <TextInput
            style={styles.input}
            placeholder={curAboutMe}
            value={newAboutMe}
            onChangeText={setNewAboutMe}
          />
          <TouchableOpacity style={styles.button} onPress={editUser}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allows content to grow vertically
  },
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start', // Align text to the left
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});

export default SettingsPage;
