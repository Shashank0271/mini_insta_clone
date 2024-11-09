import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../LoginScreen/LoginScreen';
import {Session} from '@supabase/supabase-js';
import SignupScreen from '../SignupScreen/SignupScreen';
import TabScreen from './TabScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import {RootStackNavigatorParamList} from '../../type';
import {useDispatch, useSelector} from 'react-redux';
import {setSession, UserState} from '../../redux/reducers/user';
import {AppDispatch} from '../../redux/store';
import {supabase} from '../../config/supabase_config';
import LoadingScreen from '../Loading/LoadingScreen';
import {fetchUserBySID} from '../../redux/apiCalls/user';

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

const StackScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const {isLoadingUser} = useSelector(
    ({user}: {user: UserState}): UserState => user,
  );

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      dispatch(setSession(session));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed');
      dispatch(setSession(session));
      if (session) {
        dispatch(fetchUserBySID(session.user.id));
      }
    });
  }, []);

  return (
    <Stack.Navigator>
      {!isLoadingUser ? (
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabScreen" component={TabScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Group>
      ) : isLoadingUser ? (
        <Stack.Screen
          options={{headerShown: false}}
          name="LoadingScreen"
          component={LoadingScreen}
        />
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
