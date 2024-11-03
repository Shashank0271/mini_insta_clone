import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import React, {FC} from 'react';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';
import {supabase} from '../../config/supabase_config';
import {User} from '@supabase/supabase-js';
YupPassword(yup);

const passwordErrorMessage: string =
  'password should contain lowercase , uppercase , numeric and special characters';

const SignupValidationSchema = yup.object({
  name: yup
    .string()
    .required('No name provided')
    .min(2, 'Name must have at least 2 characters')
    .max(100, 'name should be less than 100 characters'),
  username: yup
    .string()
    .required('No username provided')
    .min(2, 'Username must have at least 2 characters')
    .max(100, 'username should be less than 100 characters'),
  email: yup.string().email().required('No email provided'),
  password: yup
    .string()
    .required('No password provided')
    .min(8, 'password should be of minimum 8 characters'),
  // .minNumbers(1, passwordErrorMessage)
  // .minLowercase(1, passwordErrorMessage)
  // .minUppercase(1, passwordErrorMessage)
  // .minSymbols(1, passwordErrorMessage),
});

const Signup: FC = () => {
  const keyboardVerticalOffset =
    useHeaderHeight() + (StatusBar.currentHeight ?? 0);
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{flex: 1, justifyContent: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <ScrollView
            contentContainerStyle={{
              padding: 10,
              justifyContent: 'center',
            }}>
            <Formik
              validationSchema={SignupValidationSchema}
              initialValues={{username: '', name: '', email: '', password: ''}}
              onSubmit={async ({email, name, password, username}) => {
                //signup logic

                //1.signup with supabase
                const {
                  data: {user, session},
                  error,
                } = await supabase.auth.signUp({email, password});

                if (error) {
                  console.error(error.message);
                } else {
                  //2.Create the user in DB
                  const {id, email} = user as User;
                }
              }}>
              {({
                handleChange,
                handleSubmit,
                errors: {
                  email: emailErrorMsg,
                  name: nameErrorMsg,
                  username: usernameErrorMsg,
                  password: passwordErrorMsg,
                },
                values: {email, name, password, username},
              }) => (
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Input
                    placeholder="Enter name"
                    borderColor="black"
                    label="Name"
                    keyboardType="email-address"
                    onChangeText={handleChange('name')}
                    value={name}
                    secure={false}
                  />
                  {nameErrorMsg ? (
                    <Text style={{color: 'red'}}>{nameErrorMsg}</Text>
                  ) : null}

                  <Input
                    placeholder="Enter username"
                    borderColor="black"
                    label="Username"
                    keyboardType="email-address"
                    onChangeText={handleChange('username')}
                    value={username}
                    secure={false}
                  />
                  {usernameErrorMsg ? (
                    <Text style={{color: 'red'}}>{usernameErrorMsg}</Text>
                  ) : null}

                  <Input
                    placeholder="Enter email"
                    borderColor="black"
                    label="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={email}
                    secure={false}
                  />
                  {emailErrorMsg ? (
                    <Text style={{color: 'red'}}>{emailErrorMsg}</Text>
                  ) : null}

                  <Input
                    placeholder="Enter password"
                    borderColor="black"
                    leftIcon={<Icon name="lock" size={18} color={'grey'} />}
                    label="Password"
                    keyboardType="default"
                    onChangeText={handleChange('password')}
                    value={password}
                    secure={true}
                  />
                  {passwordErrorMsg ? (
                    <Text style={{color: 'red'}}>{passwordErrorMsg}</Text>
                  ) : null}

                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={styles.signupButton}>
                      <Text style={styles.buttonText}>Sign-up</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    minHeight: '100%',
    paddingHorizontal: 10,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#0096FF',
    borderRadius: 18,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {color: 'white', fontSize: 16, fontWeight: '500'},
});
