import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from '../LoginScreen/LoginScreen';
import {Session} from '@supabase/supabase-js';
import SignupScreen from '../SignupScreen/SignupScreen';
import TabScreen from './TabScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import {RootStackNavigatorParamList} from '../../type';

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

interface StackScreenProps {
  session: Session | null | undefined;
}

const StackScreen = ({session}: StackScreenProps) => {
  return (
    <Stack.Navigator>
      {session ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabScreen" component={TabScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackScreen;
