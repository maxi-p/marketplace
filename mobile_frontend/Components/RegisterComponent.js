
// FileName: RegisterComponent.js, Created by Griffin Zakow 

// TODO add Comments
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
import R_Validation_Data from "../logic/RegisterValidation";


// Helper functions
function buildPath(route)
{
    const app_name = 'cop4331-marketplace-98e1376d9db6'
    if (process.env.NODE_ENV === 'production')
    {
    return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
}

  // Component Functions
function RegisterComponent() {

  const [message, setMessage] = useState('');
  const doRegister = async (regData) =>
  {
    var obj = {
      firstname: regData.firstName,
      lastname: regData.lastName,
      username: regData.username,
      password: regData.pass,
      email: regData.email,
      phoneNumber: R_Validation_Data.dePhoneify(regData.phone)
    };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/register'),
      {
        method: 'POST', 
        body:js, 
        headers:{'Content-Type': 'application/json'}
      });
      var res = JSON.parse(await response.text());
      if (res.error)
      {
        setMessage(res.error);
      }
      else
      {
        setMessage("");
        props.navigation?.navigate('Login');
      }
    }
    catch(e){
      Alert.alert(e.toString());
      console.log(e.toString());
      return;
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
            rules={{ required: "This field is required", 
            }}
            render={({field: { onChange, onBlur, value}}) => (
              <RegInput 
                label="First Name"
                error={errors.firstName}
                errorText={errors.firstName?.message}

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
            rules={{required: "This field is required",}}
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Last Name"
                error={errors.lastName}
                errorText={errors.lastName?.message}

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
            rules={{
              pattern: {
                value: R_Validation_Data.userNameRegex,
                message: "Username must be 4-18 characters (Alphanumeric, -, _) and start with a character"
              },
              required: "This field is required",
            }} 
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Username"
                error={errors.username}
                errorText={errors.username?.message}

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
            rules={{
              pattern: {
                value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                message: "This must be formatted as an email"
              },
              required: "This field is required",
            }} 
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Email"
                error={errors.email}
                errorText={errors.email?.message}

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
            rules={{
              pattern:{
                value: R_Validation_Data.phoneRegex,
                message: "This must be a valid phone number"
              },
              required: "This field is required",
            }} 
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Phone Number"
                error={errors.phone}
                errorText={errors.phone?.message}

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
            rules={{ 
              pattern:{
                value: R_Validation_Data.passwordRegex,
                message: "Passwords must be 8-32 long, with at least 1 digit, 1 letter, 1 special character"
              },
              required: "This field is required"
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <RegInput 
                label="Password"
                error={errors.pass}
                errorText={errors.pass?.message}

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
              onPress={handleSubmit(doRegister)}
              title="Submit"
            />
          </View>
          <View style={[styles.form, styles.formMessage]}>
              <Text style={styles.message}>{message}</Text>
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

export default RegisterComponent;