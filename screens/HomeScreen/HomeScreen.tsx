import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import ProfileCircle from './components/ProfileCircle';
import {useDispatch, useSelector} from 'react-redux';
import {UserState} from '../../redux/reducers/user';
import {AppDispatch, AppState} from '../../redux/store';
import LoadingScreen from '../Loading/LoadingScreen';
import {fetchUserBySID} from '../../redux/apiCalls/user';
import {fetchAllFollowing} from '../../redux/apiCalls/follow';
import LoadingScreenCircle from '../Loading/LoadingScreenCircle';

const HomeScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoadingUser, session, appUser, failedToLoadUser} = useSelector(
    (state: AppState): UserState => state.user,
  );
  const {following, error, isLoadingFollowingData} = useSelector(
    (state: AppState) => state.follow,
  );

  useEffect(() => {
    const loadHomeScreenData = async () => {
      if (session) {
        await dispatch(fetchUserBySID(session!.user.id));
        await dispatch(fetchAllFollowing(appUser.userId));
      }
    };
    loadHomeScreenData();
  }, [session]);

  return isLoadingFollowingData || isLoadingUser ? (
    <LoadingScreen />
  ) : (
    <View style={styles.screen}>
      <ProfileCircle />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#000'},
});
