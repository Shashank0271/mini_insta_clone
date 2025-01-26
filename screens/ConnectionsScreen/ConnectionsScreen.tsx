import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackNavigationProp, RootStackNavigatorParamList} from '../../type';
import {FlatList} from 'react-native-gesture-handler';
import {fontFamily} from '../../constants/fonts';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {removeFollower} from '../../redux/apiCalls/follow';
import Icon from 'react-native-vector-icons/Entypo';
import {removeFollowerFromList} from '../../redux/reducers/follow';
import {FollowUser} from '../../types/FollowUser';

// note : this same component is being used to display both the followers and following screens
const ConnectionsScreen = () => {
  const {
    params: {connectionProfiles, heading},
  } = useRoute<RouteProp<RootStackNavigatorParamList, 'ConnectionsScreen'>>();
  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch = useDispatch<AppDispatch>();

  const [connectionList, setConnectionList] = useState<FollowUser[]>([]);

  const handleRemoveFollower = (followId: string, index: number) => {
    dispatch(removeFollower(followId));
    dispatch(removeFollowerFromList(index));
    setConnectionList(
      [...connectionList].filter((_, currentIndex) => currentIndex !== index),
    );
  };

  useEffect(() => {
    setConnectionList(connectionProfiles);
  }, [connectionProfiles]);

  return (
    <View style={{flex: 1, backgroundColor: '#000', paddingTop: 20}}>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 16}}
        data={connectionList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 8,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ExploreProfileScreen', {
                  otherUserSID: item.supabaseId,
                })
              }
              style={{
                flex: 1,
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <Image
                source={{uri: item.profilePicUrl}}
                style={{width: 70, height: 70, borderRadius: 100}}
              />
              <View
                style={{
                  height: '100%',
                  justifyContent: 'flex-start',
                  marginLeft: 10,
                }}>
                <Text style={styles.uname}>{item.uname}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            {heading === 'Followers' && (
              <Icon
                name="circle-with-cross"
                size={26}
                color={'#FFF'}
                onPress={() => handleRemoveFollower(item.followId, index)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ConnectionsScreen;

const styles = StyleSheet.create({
  uname: {
    fontFamily: fontFamily.semiBold,
    color: 'white',
  },
  name: {
    fontFamily: fontFamily.regular,
  },
});
