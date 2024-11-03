import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../LoginScreen/LoginScreen';
import {Session} from '@supabase/supabase-js';
import SignupScreen from '../SignupScreen/SignupScreen';
import TabScreen from './TabScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import {RootStackNavigatorParamList} from '../../type';
import {useDispatch} from 'react-redux';
import {fetchUserBySID} from '../../redux/apiCalls/user';
import {AppDispatch} from '../../redux/store';

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

interface StackScreenProps {
  session: Session | null | undefined;
}

const StackScreen = ({session}: StackScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  if (session) {
    dispatch(fetchUserBySID(session.user.id));
  }
  return (
    <Stack.Navigator>
      {session ? (
        <Stack.Group  screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabScreen" component={TabScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Group>
      ): (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackScreen;
