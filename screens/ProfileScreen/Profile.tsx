import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import LogoutAlertDialog from './components/LogoutAlertDialog';
import ProfileScreenHeader from './components/ProfileScreenHeader';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../redux/store';
import ProfileCircle from '../HomeScreen/components/ProfileCircle';
import {fontFamily} from '../../constants/fonts';
import ProfileParamView from './components/ProfileParamView';
import EditProfileButton from './components/EditProfileButton';
import {fetchUserPosts} from '../../redux/apiCalls/posts';
import LoaderKit from 'react-native-loader-kit';
import {Image} from '@rneui/themed';

const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showLogoutAlertDialog, setShowLogoutAlertDialog] =
    useState<boolean>(false);
  const {appUser} = useSelector((state: AppState) => state.user);
  const {isLoadingUserPosts, userPosts} = useSelector(
    (state: AppState) => state.post,
  );
  useEffect(() => {
    dispatch(fetchUserPosts(appUser.userId));
  }, []);

  const formatData = (dataP: Array<any>, numCols: number): Array<any> => {
    const data = [...dataP];
    const lastRowItems = data.length % numCols;
    if (lastRowItems === 0) {
      return data;
    }
    const blanks = numCols - lastRowItems;
    for (let i = 0; i < blanks; i++) {
      data.push({id: `blank-${i}`});
    }
    return data;
  };

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
            <ProfileParamView label="posts" value={appUser.posts} />
            <ProfileParamView label="followers" value={appUser.followers} />
            <ProfileParamView label="following" value={appUser.following} />
          </View>
        </View>

        <EditProfileButton />

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
            data={formatData(userPosts, 3)}
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
