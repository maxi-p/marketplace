import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../logic/UserContext';

const SettingsPage = ({ username }) => {
  const { userId } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const updateEmail = async () => {
    try {
      const response = await fetch(`https://cop4331-marketplace-98e1376d9db6.herokuapp.com/api/editUser/${userId}/email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'new_email@example.com' }), // Replace with new email
      });
      if (response.ok) {
        // Email updated successfully, you can update UI accordingly
        console.log('Email updated successfully');
      } else {
        console.error('Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  // Similar function for updating phone number

  return (
    <View style={styles.container}>
      <View style={styles.middleContent}>
        <Text style={styles.middleText}>Account Settings</Text>
        <Text style={styles.Text}>Email: {email}</Text>
        <TouchableOpacity style={styles.button} onPress={updateEmail}>
          <Text style={styles.buttonText}>Update Email</Text>
        </TouchableOpacity>
        <Text style={styles.Text}>Phone number: {phoneNumber}</Text>
        {/* Add button and logic for updating phone number */}
      </View>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContent: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 10,
  },
  middleText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 100,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    margin: 10,
    marginHorizontal: 50,
  },
});
