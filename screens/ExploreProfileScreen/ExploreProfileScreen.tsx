import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackNavigationProp, RootStackNavigatorParamList} from '../../type';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../redux/store';
import {fetchUserProfileBySID} from '../../redux/apiCalls/user';
import LoadingScreen from '../Loading/LoadingScreen';
import {fontFamily} from '../../constants/fonts';
import ProfileParamView from '../ProfileScreen/components/ProfileParamView';
import ProfileCircle from '../HomeScreen/components/ProfileCircle';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import {RelationType} from '../../types/ViewProfile';
import {formatPostsGridData} from '../../utils/functions';
import {followUser} from '../../redux/apiCalls/follow';
import LoadingScreenCircle from '../Loading/LoadingScreenCircle';

const ExploreProfileScreen: FC = () => {
  const {
    params: {otherUserSID},
  } =
    useRoute<RouteProp<RootStackNavigatorParamList, 'ExploreProfileScreen'>>();

  const [buttonMessage, setButtonMessage] = useState<
    'Message' | 'Follow' | 'Requested'
  >('Follow');

  const {isLoadingProfile, userProfile, loadingProfileError} = useSelector(
    (state: AppState) => state.viewProfile,
  );
  const {error, isLoadingRequest} = useSelector(
    (state: AppState) => state.follow,
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootStackNavigationProp>();

  console.log(userProfile);

  useEffect(() => {
    dispatch(fetchUserProfileBySID(otherUserSID));
  }, []);

  useEffect(() => {
    if (userProfile) {
      const {relationType} = userProfile;
      if (
        relationType === RelationType.FOLLOWING ||
        relationType === RelationType.PUBLIC_ACCOUNT
      ) {
        setButtonMessage('Message');
      } else if (relationType === RelationType.NONE) {
        setButtonMessage('Follow');
      } else if (relationType === RelationType.REQUESTED) {
        setButtonMessage('Requested');
      }
    }
  }, [userProfile]);

  const handleButtonPress = () => {
    if (buttonMessage === 'Follow') {
      // call follow api and change message to 'Requested'
      dispatch(followUser(userProfile!.userProfileData.userId));
      setButtonMessage('Requested');
    } else if (buttonMessage === 'Message') {
      navigation.navigate('MessageScreen', {
        recipientId: userProfile!.userProfileData.userId,
      });
    } else if (buttonMessage === 'Requested') {
    }
  };

  return isLoadingProfile || !userProfile ? (
    <LoadingScreen />
  ) : (
    <>
      <View style={styles.profileScreenHeaderContainer}>
        <MaterialIcon
          name="arrow-left"
          style={{marginRight: 10}}
          size={24}
          color={'#FFF'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>
          {userProfile!.userProfileData.uname}
        </Text>
      </View>

      <View style={styles.screen}>
        <View style={styles.topSection}>
          <View>
            <ProfileCircle
              imageUrl={userProfile.userProfileData.profilePicUrl}
              name={userProfile.userProfileData.name}
              size={80}
            />
            <Text style={styles.text}>{userProfile.userProfileData.bio}</Text>
          </View>

          <View style={styles.profileParamRow}>
            <ProfileParamView
              label="posts"
              value={userProfile.userProfileData.posts}
            />

            <ProfileParamView
              label="followers"
              value={userProfile.userProfileData.followers}
            />

            <ProfileParamView
              label="following"
              value={userProfile.userProfileData.following}
            />
          </View>
        </View>

        <CustomButton
          label={isLoadingRequest ? <LoadingScreenCircle /> : buttonMessage}
          onPress={handleButtonPress}
        />

        {userProfile.postList ? (
          <FlatList
            data={formatPostsGridData(userProfile.postList, 3)}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={({item}) => {
              return typeof item.id === 'string' ? (
                <View style={styles.f1}></View>
              ) : (
                <View style={styles.f1}>
                  <Image
                    source={{uri: item.imageUrls[0]}}
                    style={styles.imageContainer}
                  />
                </View>
              );
            }}
          />
        ) : null}
      </View>
    </>
  );
};

export default ExploreProfileScreen;

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
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: '#FFF',
  },
  headerText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
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
  profileScreenHeaderContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
