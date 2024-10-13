import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import NavigationStrings from './NavigationStrings';
import Icon from 'react-native-vector-icons/Ionicons';
import AddPost from '../AddPostScreen/AddPost';
import Profile from '../ProfileScreen/Profile';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route: {name: routeName}}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          switch (routeName) {
            case NavigationStrings.HomeScreen:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case NavigationStrings.AddPostScreen:
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case NavigationStrings.ProfileScreen:
              iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Icon name={iconName} size={32} color={'white'} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#000'},
      })}>
      <Tab.Screen name={NavigationStrings.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={NavigationStrings.AddPostScreen} component={AddPost} />
      <Tab.Screen name={NavigationStrings.ProfileScreen} component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
