import {NavigationProp} from '@react-navigation/native';
import {FollowUser} from './types/FollowUser';

type RootStackNavigatorParamList = {
  TabScreen: undefined;
  ChatScreen: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  HomeScreen: undefined;
  AddPostScreen: undefined;
  ProfileScreen: undefined;
  LoadingScreen: undefined;
  MessageScreen: {chatId: string; recipientId: string};
  ConnectionsScreenTabs: undefined;
  ConnectionsScreenFollowers: {
    connectionProfiles: Array<FollowUser>;
    heading: 'Followers';
  };
  ConnectionsScreenFollowing: {
    connectionProfiles: Array<FollowUser>;
    heading: 'Following';
  };
  ConnectionsScreen: {
    connectionProfiles: Array<FollowUser>;
    heading: string;
  };
};

type RootStackNavigationProp = NavigationProp<RootStackNavigatorParamList>;
