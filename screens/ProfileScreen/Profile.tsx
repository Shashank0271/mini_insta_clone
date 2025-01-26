import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import LogoutAlertDialog from './components/LogoutAlertDialog';
import ProfileScreenHeader from './components/ProfileScreenHeader';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../redux/store';
import ProfileCircle from '../HomeScreen/components/ProfileCircle';
import {fontFamily} from '../../constants/fonts';
import ProfileParamView from './components/ProfileParamView';
import CustomButton from '../../components/CustomButton';
import {fetchUserPosts} from '../../redux/apiCalls/posts';
import LoaderKit from 'react-native-loader-kit';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../type';
import {formatPostsGridData} from '../../utils/functions';

const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [showLogoutAlertDialog, setShowLogoutAlertDialog] =
    useState<boolean>(false);
  const {appUser} = useSelector((state: AppState) => state.user);
  const {isLoadingUserPosts, userPosts} = useSelector(
    (state: AppState) => state.post,
  );
  
  useEffect(() => {
    dispatch(fetchUserPosts(appUser.userId));
  }, []);

  return (
    <>
      <ProfileScreenHeader
        onPress={() => {
          setShowLogoutAlertDialog(!showLogoutAlertDialog);
        }}
      />
      <View style={styles.screen}>
        <View style={styles.topSection}>
          <View>
            <ProfileCircle
              imageUrl={appUser.profilePicUrl}
              name={appUser.uname}
              size={80}
            />
            <Text style={styles.text}>{appUser.bio}</Text>
          </View>

          <View style={styles.profileParamRow}>
            <ProfileParamView label="postrs" value={appUser.posts} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ConnectionsScreenTabs', {
                  initialRouteName: 'ConnectionsScreenFollowers',
                })
              }>
              <ProfileParamView label="followers" value={appUser.followers} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ConnectionsScreenTabs', {
                  initialRouteName: 'ConnectionsScreenFollowing',
                });
              }}>
              <ProfileParamView label="following" value={appUser.following} />
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton label="Edit profile" onPress={() => {}} />

        <LogoutAlertDialog
          visible={showLogoutAlertDialog}
          onRequestClose={() => setShowLogoutAlertDialog(false)}
        />

        {isLoadingUserPosts ? (
          <View style={styles.loadingView}>
            <LoaderKit name={'LineSpinFadeLoader'} color="white" />
          </View>
        ) : (
          <FlatList
            data={formatPostsGridData(userPosts, 3)}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={({item}) => {
              return typeof item.id === 'string' ? (
                <View style={styles.f1}></View>
              ) : (
                <View style={styles.f1}>
                  <Image
                    source={{uri: item.imageUrls[0]}}
                    style={styles.imageContainer}></Image>
                </View>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageContainer: {
    height: 100,
    margin: 1,
  },
  f1: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  textNumeric: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: '#FFF',
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#FFF',
  },
  profileParamRow: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 4,
    justifyContent: 'space-around',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    gap: '40%',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
