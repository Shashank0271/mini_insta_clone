import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen/LoginScreen';
import {supabase} from '../../config/supabase_config';
import {Session} from '@supabase/supabase-js';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  const [session, setSession] = useState<Session | null>();
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      // console.log(session);
      setSession(session);
    });
  });
  return (
    <Stack.Navigator>
      <Stack.Screen name="loginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default StackScreen;
