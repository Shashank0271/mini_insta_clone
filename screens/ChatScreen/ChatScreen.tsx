import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchChatFeed} from '../../redux/apiCalls/chat';
import {AppDispatch, AppState} from '../../redux/store';
import LoadingScreenCircle from '../Loading/LoadingScreenCircle';
import {FlatList} from 'react-native-gesture-handler';
import {fontFamily} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../type';
import {ChatUser} from '../../types/ChatUser';

const ChatScreen: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {isLoadingFeed, isLoadingFeedError, feed} = useSelector(
    (state: AppState) => state.chatFeed,
  );
  const userId = useSelector((state: AppState) => state.user.appUser.userId);
  useEffect(() => {
    dispatch(fetchChatFeed());
  }, []);

  return isLoadingFeed ? (
    <LoadingScreenCircle />
  ) : (
    <View style={{flex: 1, backgroundColor: '#000', paddingVertical: 16}}>
      <FlatList
        data={feed}
        ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MessageScreen', {
                  recipientId: item.userId,
                })
              }
              activeOpacity={0.7}
              style={{
                width: '90%',
                alignSelf: 'center',
                paddingVertical: 12,
                backgroundColor: '#000',
                flexDirection: 'row',
              }}>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 100,
                  marginRight: 10,
                }}
                source={{
                  uri: item.profilePicUrl,
                }}
              />
              <Text style={{fontFamily: fontFamily.medium, color: '#FFF'}}>
                {item.uname}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
