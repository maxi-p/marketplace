import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { UserContext } from '../logic/UserContext';

const SettingsPage = () => {
  const { user } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newAboutMe, setNewAboutMe] = useState('');

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
        setNewUsername(userData.username || '');
        setNewPassword(userData.password || '');
        setNewFirstName(userData.firstName || '');
        setNewLastName(userData.lastName || '');
        setNewEmail(userData.email || '');
        setNewPhoneNumber(userData.phoneNumber || '');
        setNewAboutMe(userData.aboutMe || '');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      Alert.alert('Error', 'Failed to fetch user info. Please try again.');
    }
  };

  console.log("old username: ", user.username)
  console.log("old password: ", user.password)
  console.log("old first name: ", user.firstName)
  console.log("old last name: ", user.lastName)
  console.log("old email: ", user.email)
  console.log("old phone number: ", user.phoneNumber)
  console.log("old about me: ", user.aboutMe)

  console.log("new username: ", newUsername)
  console.log("new password: ", newPassword)
  console.log("new first name: ", newFirstName)
  console.log("new last name: ", newLastName)
  console.log("new email: ", newEmail)
  console.log("new phone number: ", newPhoneNumber)
  console.log("new about me: ", newAboutMe)


  const editUser = async () => {
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
        return responseData;
      }
    } catch (error) {
      console.error('Error editing user:', error);
      throw new Error('Failed to edit user. Please try again.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Settings</Text>
        <Text style={styles.labelText}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder={user.username}
          value={newUsername}
          onChangeText={setNewUsername}
        />
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.labelText}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder={user.firstName}
          value={newFirstName}
          onChangeText={setNewFirstName}
        />
        <Text style={styles.labelText}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder={user.lastName}
          value={newLastName}
          onChangeText={setNewLastName}
        />
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder={user.email}
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <Text style={styles.labelText}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder={user.phoneNumber}
          value={newPhoneNumber}
          onChangeText={setNewPhoneNumber}
        />
        <Text style={styles.labelText}>About Me</Text>
        <TextInput
          style={styles.input}
          placeholder={user.aboutMe}
          value={newAboutMe}
          onChangeText={setNewAboutMe}
        />
        <TouchableOpacity style={styles.button} onPress={editUser}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
});

export default SettingsPage;
