import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import StackScreen from './screens/StackScreen/StackScreen';
import {supabase} from './config/supabase_config';
import {Session} from '@supabase/supabase-js';

function App() {

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
    <NavigationContainer>
      <StackScreen session={session} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
