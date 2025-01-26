import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {setSession} from '../../redux/reducers/appUser';
import {AppDispatch, AppState} from '../../redux/store';
import {supabase} from '../../config/supabase_config';
import LoginScreen from '../LoginScreen/LoginScreen';
import SignupScreen from '../SignupScreen/SignupScreen';
import TabScreen from './TabScreen';
import ChatScreen from '../ChatScreen/ChatScreen';
import MessageScreen from '../MessageScreen/MessageScreen';
import {RootStackNavigatorParamList} from '../../type';
import ConnectionsScreenTabs from '../ConnectionsScreen/ConnectionsScreenTabs';
import ExploreProfileScreen from '../ExploreProfileScreen/ExploreProfileScreen';
import RequestsScreen from '../RequestsScreen/RequestsScreen';

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

const StackScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

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
          <Stack.Screen name="MessageScreen" component={MessageScreen} />
          <Stack.Screen
            name="ConnectionsScreenTabs"
            component={ConnectionsScreenTabs}
          />
          <Stack.Screen
            name="ExploreProfileScreen"
            component={ExploreProfileScreen}
          />
          <Stack.Screen name="RequestsScreen" component={RequestsScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackScreen;
