import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Keyboard,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {supabase} from '../../config/supabase_config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../../components/Input';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import {Formik} from 'formik';
import {User} from '@supabase/supabase-js';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackNavigationProp} from '../../type';

YupPassword(yup);

const passwordErrorMessage: string =
  'password should contain lowercase , uppercase , numeric and special characters';

const LoginValidationSchema = yup.object({
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

const LoginScreen: FC = () => {
  const [keyBoardShowing, setKeyBoardShowing] = useState(false);

  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    const showSubsctiption = Keyboard.addListener('keyboardDidShow', () => {
      setKeyBoardShowing(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardShowing(false);
    });
    return () => {
      showSubsctiption.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[styles.screen]}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={async ({email, password}) => {
          const {
            data: {user, session},
            error,
          } = await supabase.auth.signInWithPassword({email, password});

          if (error) {
            console.log(error.message);
            //TODO : show a snackbar displaying the error message
          } else {
            const {id: supabaseId, email} = user as User;
            //TODO : fetch the user from the database using supabaseId and update the state
          }
        }}
        validationSchema={LoginValidationSchema}>
        {({
          handleChange,
          values: {email, password},
          handleSubmit,
          errors: {email: emailError, password: passwordError},
        }) => (
          <View style={{gap: 5, width: '100%'}}>
            <Input
              placeholder="Enter email"
              borderColor="black"
              leftIcon={<Icon name="envelope" size={18} color={'grey'} />}
              label="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              value={email}
              secure={false}
            />
            {emailError ? (
              <Text style={{color: 'red'}}>{emailError}</Text>
            ) : null}

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

            <TouchableOpacity onPress={() => handleSubmit()}>
              <View style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {!keyBoardShowing ? (
        <TouchableOpacity
          style={styles.pab10}
          onPress={() => {
            navigation.navigate('SignupScreen');
          }}>
          <View style={styles.registerButton}>
            <Text style={[styles.buttonText, {color: '#0096FF'}]}>
              Create a new account
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: '100%',
    backgroundColor: '#0096FF',
    borderRadius: 18,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  registerButton: {
    width: '100%',
    borderRadius: 18,
    paddingVertical: 8,
    borderColor: '#0096FF',
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {color: 'white', fontSize: 16, fontWeight: '500'},
  screen: {
    flex: 1,
    paddingTop: 250,
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  pab10: {position: 'absolute', bottom: 20, width: '100%'},
});

export default LoginScreen;
