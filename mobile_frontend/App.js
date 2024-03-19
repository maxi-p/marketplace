// FileName: App.js 

// TODO add Comments
// TODO Move to new File
// TODO Expand Image when Pressed
import React, {} from "react"; 
import { 
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
	StyleSheet,
  TextInput,
  Touchable,
  TouchableWithoutFeedback,
  Button,
  ScrollView,
} from "react-native"; 


// Move From Here
function RegisterComponent() {
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* Component Starts Here*/}
          <View>
          {/* First Name*/}
          <RegInput 
            label="First Name"

            autoCapitalize="words"
            textContentType="givenName"
            autoComplete="given-name"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"

            onSubmitEditing={(event) => { event && this.LNRef.focus()}}
            inputRef={(r) => this.FNRef = r}
          />
          {/* Last Name*/}
          <RegInput 
            label="Last Name"

            autoCapitalize="words"
            textContentType="familyName"
            autoComplete="family-name"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"

            onSubmitEditing={(event) => { event && this.UNRef.focus()}}
            inputRef={(r) => this.LNRef = r}
            
          />
          {/* Username*/}
          <RegInput 
            label="Username"

            autoCapitalize="none"
            textContentType="username"
            autoComplete="username"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"

            onSubmitEditing={(event) => { event && this.EMRef.focus()}}
            inputRef={(r) => this.UNRef = r}
          />
          {/* Email*/}
          <RegInput 
            label="Email"

            autoCapitalize="none"
            textContentType="emailAddress"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"

            onSubmitEditing={(event) => { event && this.PHRef.focus()}}
            inputRef={(r) => this.EMRef = r}
          />
          {/* Phone Number*/}
          <RegInput 
            label="Phone Number"

            autoCapitalize="none"
            textContentType="telephoneNumber"
            autoComplete="tel"
            autoCorrect={false}
            keyboardType="phone-pad"
            returnKeyType="next"

          onSubmitEditing={(event) => { event && this.PWRef.focus()}}
            inputRef={(r) => this.PHRef = r}
          />
          {/* Password*/}
          <RegInput 
            label="Password"

            autoCapitalize="none"
            textContentType="password"
            autoComplete="new-password"
            autoCorrect={false}
            keyboardType="visible-password"
            returnKeyType="done"


            inputRef={(r) => this.PWRef = r}
          />
          <View style={[styles.form, styles.formButton]}>
            <Button 
              onPress={null}
              title="Submit"
              disabled
            />
          </View>
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  ) };

  // Register Input: Acts like TextInput with label
  // Props:
  //  All Textinput Props
  //  label - lable text
  //  errorText - Error Text
  //  style effects Textinput Style
  //  formStyle
  //  labelStyle
  //  inputRef - Ref of TextInput
function RegInput(props) {
  return (
    <View style={[styles.form, props.formStyle]}>
      {props.label && (
        <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      )}
      <TextInput
        style={[styles.textInput, props.error && styles.errorInput, props.style]}
        {...props}
        ref={(r) => {props.inputRef && props.inputRef(r)}}
        />
        {props.errorText && (
          <Text style={styles.errorText}>{props.errorText}</Text>
        )}

    </View>
  )
}
function App() {
  return(
    <ScrollView>
      <RegisterComponent />
    </ScrollView>
  )};

const styles = StyleSheet.create({
  // ----
  root: { },
  container: { },
  form: { },
  label: { },
  textInput: {
    height:40,
    margin:12,
    borderWidth: 1,
    padding: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
  },
});
export default App;
