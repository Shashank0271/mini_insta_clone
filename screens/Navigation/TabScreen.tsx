import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen';
import NavigationStrings from './NavigationStrings';
import Icon from 'react-native-vector-icons/Ionicons';
import AddPost from '../AddPostScreen/AddPost';
import Profile from '../ProfileScreen/Profile';
import HomeScreenHeader from '../HomeScreen/components/HomeScreenHeader';
import {RootStackNavigatorParamList} from '../../type';

const Tab = createBottomTabNavigator<RootStackNavigatorParamList>();

const TabScreen: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen" // NEEDS TO BE HomeScreen
      screenOptions={({route: {name: routeName}}) => ({
        tabBarIcon: ({focused}) => {
          let iconName: string = '';
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
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#000'},
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          header: () => <HomeScreenHeader />,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="AddPostScreen"
        component={AddPost}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileScreen"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
export default TabScreen;
