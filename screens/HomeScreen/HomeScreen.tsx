import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import ProfileCircle from './components/ProfileCircle';
import {useDispatch, useSelector} from 'react-redux';
import {UserState} from '../../redux/reducers/appUser';
import {AppDispatch, AppState} from '../../redux/store';
import {fetchUserBySID} from '../../redux/apiCalls/user';
import {fetchAllFollowing} from '../../redux/apiCalls/follow';
import LoadingScreenCircle from '../Loading/LoadingScreenCircle';
import {FollowUser} from '../../types/FollowUser';
import {fetchFeed} from '../../redux/apiCalls/posts';
import {Post} from '../../types/Post';
import {fontFamily} from '../../constants/fonts';
import PostSection from './components/PostSection';

const HomeScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {session, appUser} = useSelector(
    (state: AppState): UserState => state.user,
  );
  const {following, isLoadingFollowingData} = useSelector(
    (state: AppState) => state.follow,
  );
  const {feed, isLoadingFeed} = useSelector((state: AppState) => state.post);
  const triggeredLoading = useRef<boolean>(false);

  useEffect(() => {
    if (session && !triggeredLoading.current) {
      triggeredLoading.current = true;
      dispatch(fetchUserBySID(session.user.id));
    }
  }, [session]);

  useEffect(() => {
    if (appUser.userId) {
      dispatch(fetchAllFollowing(appUser.userId));
      dispatch(fetchFeed(appUser.userId));
    }
  }, [appUser.userId]);

  return isLoadingFeed || isLoadingFollowingData ? (
    <LoadingScreenCircle />
  ) : (
    <View style={styles.screen}>
      <View style={styles.avatarRow}>
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
      <FlatList
        data={feed}
        renderItem={({item}: {item: Post}) => {
          return <PostSection item={item} />;
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#000'},
  avatarRow: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 12,
    marginVertical: 8,
  },
  caption: {
    fontFamily: fontFamily.medium,
    color: '#FFF',
  },
  postCaptionUserName: {
    fontFamily: fontFamily.semiBold,
    color: '#FFF',
  },
});
