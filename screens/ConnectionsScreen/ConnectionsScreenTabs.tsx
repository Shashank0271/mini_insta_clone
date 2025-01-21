import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootStackNavigatorParamList} from '../../type';
import ConnectionsScreen from './ConnectionsScreen';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../redux/store';
import {fetchAllFollowers} from '../../redux/apiCalls/follow';
import LoadingScreen from '../Loading/LoadingScreen';
import {fontFamily} from '../../constants/fonts';

const Tab = createMaterialTopTabNavigator<RootStackNavigatorParamList>();

const ConnectionsScreenTabs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    isLoadingFollowerData,
    followers,
    loadingFollowerDataError,
    following,
  } = useSelector((state: AppState) => state.follow);

  useEffect(() => {
    if (followers.length === 0) {
      dispatch(fetchAllFollowers());
    }
  });

  return isLoadingFollowerData ? (
    <LoadingScreen />
  ) : (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          color: 'white',
          fontFamily: fontFamily.semiBold,
        },
        tabBarStyle: {backgroundColor: 'black'},
        
      }}>
      {/* follower */}
      <Tab.Screen
        name="ConnectionsScreenFollowers"
        component={ConnectionsScreen}
        initialParams={{connectionProfiles: followers, heading: 'Followers'}}
        options={{
          title: 'Followers',
        }}
      />
      {/* following */}
      <Tab.Screen
        name="ConnectionsScreenFollowing"
        component={ConnectionsScreen}
        initialParams={{connectionProfiles: following, heading: 'Following'}}
        options={{
          title: 'Following',
        }}
      />
    </Tab.Navigator>
  );
};

export default ConnectionsScreenTabs;

const styles = StyleSheet.create({});
