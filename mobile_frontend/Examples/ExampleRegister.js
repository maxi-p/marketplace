// FileName: App.js 

// TODO add Comments
// TODO Add Username Validation
// TODO add Password Validation
// TODO Add Phone number validation
import React, {useState} from "react"; 
import { 
  Alert,
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
	StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  ScrollView,
} from "react-native"; 
import { useForm, Controller } from "react-hook-form";
import RegisterComponent from "./Components/RegisterComponent";

function App() {
  return(
    <ScrollView>
      <RegisterComponent />
    </ScrollView>
  )};

const styles = StyleSheet.create({
});
export default App;
