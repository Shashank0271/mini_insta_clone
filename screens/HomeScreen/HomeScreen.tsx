import {StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import ProfileCircle from './components/ProfileCircle';
import {useDispatch, useSelector} from 'react-redux';
import {UserState} from '../../redux/reducers/appUser';
import {AppDispatch, AppState} from '../../redux/store';
import {fetchUserBySID} from '../../redux/apiCalls/user';
import {fetchAllFollowing} from '../../redux/apiCalls/follow';

import LoadingScreenCircle from '../Loading/LoadingScreenCircle';
import { FollowUser } from '../../types/FollowUser';

const HomeScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {session, appUser, failedToLoadUser} = useSelector(
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

  return isLoadingFollowingData ? (
    <LoadingScreenCircle />
  ) : (
    <View style={styles.screen}>
      <View style={{flexDirection: 'row', gap: 16, marginLeft: 10}}>
        <ProfileCircle
          imageUrl={appUser.profilePicUrl}
          name="Your story"
          showAddIcon
        />
        {following.map((followingUser: FollowUser) => (
          <ProfileCircle
            key={followingUser.id}
            imageUrl={followingUser.profilePicUrl}
            name={followingUser.name}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#000'},
});
