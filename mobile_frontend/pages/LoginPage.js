import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Login from '../Components/Login';

const LoginPage = (props) => {
  return (
    <View style={styles.container}>
          <Login 
          {...props}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumorchid',
    width: '100%'
  },
});

export default LoginPage;
