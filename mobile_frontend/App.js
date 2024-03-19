// FileName: App.js 

// TODO add Comments
// TODO Move to new File
// TODO Expand Image when Pressed
import React, {} from "react"; 
import { 
  Alert,
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
import { useForm, Controller } from "react-hook-form";


// Move From Here
function RegisterComponent() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {console.log(data)};

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* Component Starts Here*/}
          <View>
          {/* First Name*/}
          <Controller 
            name="firstName"
            defaultValue=""
            rules={{ required: true, 
            }}
            render={({field: { onChange, onBlur, value}}) => (
              <RegInput 
                label="First Name"
                error={errors.firstName}
                errorText={errors.firstName && "This is Required"}

                autoCapitalize="words"
                textContentType="givenName"
                autoComplete="given-name"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"

                onSubmitEditing={(event) => { event && this.LNRef.focus()}}
                inputRef={(r) => this.FNRef = r}

                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            control={control}
          />

          {/* Last Name*/}
          <Controller 
            name="lastName"
            defaultValue=""
            rules={{required: true,}}
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Last Name"
                error={errors.lastName}
                errorText={errors.lastName && "This is required"}

                autoCapitalize="words"
                textContentType="familyName"
                autoComplete="family-name"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"

                onSubmitEditing={(event) => { event && this.UNRef.focus()}}
                inputRef={(r) => this.LNRef = r}

                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                
              />
            )}
            control={control}
          />
          {/* Username*/}
          <Controller 
            name="username"
            defaultValue=""
            rules={{required: true,}} 
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Username"
                error={errors.username}
                errorText={errors.username && "This is required"}

                autoCapitalize="none"
                textContentType="username"
                autoComplete="username"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"

                onSubmitEditing={(event) => { event && this.EMRef.focus()}}
                inputRef={(r) => this.UNRef = r}

                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            control={control}
          />
          {/* Email*/}
          <Controller 
            name="email"
            defaultValue=""
            rules={{required: true,}} 
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Email"
                error={errors.email}
                errorText={errors.email && "This is required"}

                autoCapitalize="none"
                textContentType="emailAddress"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"

                onSubmitEditing={(event) => { event && this.PHRef.focus()}}
                inputRef={(r) => this.EMRef = r}

                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            control={control}
          />
          {/* Phone Number*/}
          <Controller 
            name="phone"
            defaultValue=""
            rules={{required: true,}} 
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Phone Number"
                error={errors.phone}
                errorText={errors.phone && "This is required"}

                autoCapitalize="none"
                textContentType="telephoneNumber"
                autoComplete="tel"
                autoCorrect={false}
                keyboardType="phone-pad"
                returnKeyType="next"

              onSubmitEditing={(event) => { event && this.PWRef.focus()}}
                inputRef={(r) => this.PHRef = r}

                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            control={control}
          />
          {/* Password*/}
          <Controller 
            name="pass"
            defaultValue=""
            rules={{required: true,}} 
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Password"
                error={errors.pass}
                errorText={errors.pass && "This is required"}

                autoCapitalize="none"
                textContentType="password"
                autoComplete="new-password"
                autoCorrect={false}
                keyboardType="visible-password"
                returnKeyType="done"

                inputRef={(r) => this.PWRef = r}
                
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            control={control}
          />
          <View style={[styles.form, styles.formButton]}>
            <Button 
              onPress={handleSubmit(onSubmit)}
              title="Submit"
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
  //  error
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
