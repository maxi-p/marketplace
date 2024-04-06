import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../logic/UserContext';

const SettingsPage = () => {
  const { user, setId, setUsername, setFirstName, setLastName, setEmail, setPhoneNumber, setAboutMe } = useContext(UserContext);
  const [newUserInfo, setNewUserInfo] = useState({
    newFirstName: user.firstname,
    newLastName: user.lastname,
    newUserName: user.username,
    newPassword: '', // Assuming you don't display or update password in the settings page
    newEmail: user.email,
    newPhoneNumber: user.phoneNumber,
    newAboutMe: user.aboutMe,
  });

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          ...newUserInfo,
        }),
      });
      const data = await response.json();
      if (data.error) {
        // Handle error
        console.error(data.error);
        Alert.alert('Error', 'Failed to update user settings');
      } else {
        // Update user context with new information
        setId(user.id);
        setFirstName(newUserInfo.newFirstName);
        setLastName(newUserInfo.newLastName);
        setUsername(newUserInfo.newUserName);
        setEmail(newUserInfo.newEmail);
        setPhoneNumber(newUserInfo.newPhoneNumber);
        setAboutMe(newUserInfo.newAboutMe);
        // Optionally, show success message
        Alert.alert('Success', 'User settings updated successfully');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input fields for updating user information */}
      <TextInput
        style={styles.input}
        placeholder="New First Name"
        value={newUserInfo.newFirstName}
        onChangeText={(text) => setNewUserInfo({ ...newUserInfo, newFirstName: text })}
      />
      {/* Add more input fields for other user information */}

      {/* Button to trigger update */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SettingsPage;
