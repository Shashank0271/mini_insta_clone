import {NavigationProp} from '@react-navigation/native';

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
};

type RootStackNavigationProp = NavigationProp<RootStackNavigatorParamList>;
