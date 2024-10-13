import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen/LoginScreen';
import {supabase} from '../../config/supabase_config';
import {Session} from '@supabase/supabase-js';
import SignupScreen from '../SignupScreen/SignupScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import TabScreen from './TabScreen';
import NavigationStrings from './NavigationStrings';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed');
      setSession(session);
    });
  }, []);

  return (
    <Stack.Navigator>
      {session ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NavigationStrings.TabScreen}
            component={TabScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={NavigationStrings.LoginScreen}
            component={LoginScreen}
          />
          <Stack.Screen
            name={NavigationStrings.SignupScreen}
            component={SignupScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackScreen;
