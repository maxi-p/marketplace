import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../logic/UserContext';

const SettingsPage = () => {
  const { user, setUsername, setPassword, setFirstName, setLastName, setEmail, setPhoneNumber, setAboutMe } = useContext(UserContext);
  const [newFirstName, setNewFirstName] = useState(user.firstName || '');
  const [newLastName, setNewLastName] = useState(user.lastName || '');
  const [newEmail, setNewEmail] = useState(user.email || '');
  const [newPhoneNumber, setNewPhoneNumber] = useState(user.phoneNumber || '');
  const [newAboutMe, setNewAboutMe] = useState(user.aboutMe || '');

  useEffect(() => {
    // Update state with user's current information once user context is available
    if (user) {
      setNewFirstName(user.firstName || '');
      setNewLastName(user.lastName || '');
      setNewEmail(user.email || '');
      setNewPhoneNumber(user.phoneNumber || '');
      setNewAboutMe(user.aboutMe || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
        const editedUserInfo = {
            id: user.id,
            username: user.username,
            password: user.password,
            newFirstName: newFirstName || user.firstName,
            newLastName: newLastName || user.lastName,
            newEmail: newEmail || user.email,
            newPhoneNumber: newPhoneNumber || user.phoneNumber,
            newAboutMe: newAboutMe || user.aboutMe,
        };

        // Make API call to update user info with editedUserInfo
        const response = await fetch('https://cop4331-marketplace-98e1376d9db6.herokuapp.com/api/editUser', {
            method: 'POST',
            body: JSON.stringify(editedUserInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // Handle response
        if (data.error) {
            throw new Error(data.error);
        } else {
            // Update user context with new user info
            setFirstName(newFirstName);
            setLastName(newLastName);
            setEmail(newEmail);
            setPhoneNumber(newPhoneNumber);
            setAboutMe(newAboutMe);

            // Display success message
            Alert.alert('Success', 'User info updated successfully.');
        }
    } catch (error) {
        console.error('Error updating user info:', error);
        Alert.alert('Error', 'Failed to update user info. Please try again.');
    }
};

  console.log(user.username);
  console.log(user.password);
  console.log(user.firstName);
  console.log(user.lastName);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      <Text style={styles.labelText}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={user.firstName}
        onChangeText={setNewFirstName}
      />
      <Text style={styles.labelText}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={user.lastName}
        onChangeText={setNewLastName}
      />
      <Text style={styles.labelText}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={setNewEmail}
      />
      <Text style={styles.labelText}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={user.phoneNumber}
        onChangeText={setNewPhoneNumber}
      />
      <Text style={styles.labelText}>About Me</Text>
      <TextInput
        style={styles.input}
        placeholder="About Me"
        value={user.aboutMe}
        onChangeText={setNewAboutMe}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
