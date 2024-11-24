import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {setSession, setSupabaseId} from '../../redux/reducers/appUser';
import {AppDispatch, AppState} from '../../redux/store';
import {supabase} from '../../config/supabase_config';
import LoginScreen from '../LoginScreen/LoginScreen';
import SignupScreen from '../SignupScreen/SignupScreen';
import TabScreen from './TabScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import {Session} from '@supabase/supabase-js';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const [session, setSession] = useState<Session | undefined | null>(undefined);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      dispatch(setSession(session));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });
  }, []);

  const {session} = useSelector((state: AppState) => state.user);
  return (
    <Stack.Navigator>
      {session === null ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabScreen" component={TabScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackScreen;
