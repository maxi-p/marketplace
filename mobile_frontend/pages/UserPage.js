import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../logic/UserContext';

const UserPage = () => {
  const { user } = useContext(UserContext);
  const [curUsername, setCurUsername] = useState('');
  const [curFirstName, setCurFirstName] = useState('');
  const [curLastName, setCurLastName] = useState('');
  const [curEmail, setCurEmail] = useState('');
  const [curPhoneNumber, setCurPhoneNumber] = useState('');
  const [curAboutMe, setCurAboutMe] = useState('');

  useEffect(() => {
    // Fetch user data when component mounts
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
        setCurUsername(userData.user.username || '');
        setCurFirstName(userData.user.firstname || '');
        setCurLastName(userData.user.lastname || '');
        setCurEmail(userData.user.email || '');
        setCurPhoneNumber(userData.user.phoneNumber || '');
        setCurAboutMe(userData.user.aboutme || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to fetch user data. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{curUsername}'s Information</Text>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Username</Text>
        <Text>{curUsername}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Name</Text>
        <Text>{curFirstName + " " + curLastName}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Email</Text>
        <Text>{curEmail}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Phone Number</Text>
        <Text>{curPhoneNumber}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>About Me</Text>
        <Text>{curAboutMe}</Text>
      </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'top',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'flex-start', // Align text to the left
  },
  label: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserPage;
