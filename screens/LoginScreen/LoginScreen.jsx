import {StyleSheet, View, Button, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/Input';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import {Formik} from 'formik';
YupPassword(yup);

const passwordErrorMessage =
  'password should contain lowercase , uppercase , numeric and special characters';

const LoginValidationSchema = yup.object({
  email: yup.string().email().required('No email provided'),
  password: yup
    .string()
    .required('No password provided')
    .min(8, 'password should be of minimum 8 characters')
    .minNumbers(1, passwordErrorMessage)
    .minLowercase(1, passwordErrorMessage)
    .minUppercase(1, passwordErrorMessage)
    .minSymbols(1, passwordErrorMessage),
});

const LoginScreen = () => {
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={({email, password}) => {
        console.log(email, password);
      }}
      validationSchema={LoginValidationSchema}>
      {({
        handleChange,
        values: {email, password},
        handleSubmit,
        errors: {email: emailError, password: passwordError},
      }) => (
        <View style={{paddingHorizontal: 10}}>
          <Input
            placeholder="Enter email"
            borderColor="black"
            leftIcon={<Icon name="envelope" size={18} color={'grey'} />}
            label="Email"
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            value={email}
          />
          {emailError ? <Text style={{color: 'red'}}>{emailError}</Text> : null}
          <Input
            placeholder="Enter password"
            leftIcon={<Icon name="lock" size={24} color={'grey'} />}
            label="Password"
            borderColor="black"
            onChangeText={handleChange('password')}
            secure={true}
            value={password}
          />
          {passwordError ? (
            <Text style={{color: 'red'}}>{passwordError}</Text>
          ) : null}
          <Button title="Login" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
