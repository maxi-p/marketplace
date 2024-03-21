import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomePage = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page</Text>
      <Text>This is your home page content.</Text>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {/* Add more content here as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default HomePage;
