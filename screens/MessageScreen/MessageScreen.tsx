import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../redux/store';
import {RootStackNavigatorParamList} from '../../type';
import LoadingScreen from '../Loading/LoadingScreen';
import {fetchChatMessages} from '../../redux/apiCalls/chat';
import {SERVER_IP} from '../../constants/constants';
import {appendMessage} from '../../redux/reducers/chat';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ChatMessage} from '../../types/ChatMessage';

const MessageScreen: FC = () => {
  const {params} =
    useRoute<RouteProp<RootStackNavigatorParamList, 'MessageScreen'>>();
  const {recipientId} = params;
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const {isLoadingMessages, messages} = useSelector(
    (state: AppState) => state.chatFeed,
  );
  const {userId} = useSelector((state: AppState) => state.user.appUser);
  const socketRef = useRef<WebSocket | undefined>();
  const [chatId, setChatId] = useState<string>('');

  const formChatId = (): string => {
    if (userId < recipientId) {
      return userId + recipientId;
    }
    return recipientId + userId;
  };

  console.log(messages);

  useEffect(() => {
    setChatId(formChatId());
  }, []);

  useEffect(() => {
    dispatch(fetchChatMessages(chatId));
    const socket = new WebSocket(
      `ws://${SERVER_IP}:9000/chat/?senderId=${userId}&recipientId=${recipientId}&roomId=${chatId}`,
    );
    socketRef.current = socket;
    socket.addEventListener('open', () => {
      console.log(
        `connection established between current userId : ${userId} , recipientId : ${recipientId}`,
      );
    });
    socket.addEventListener('message', event => {
      const incomingMessage: ChatMessage = {
        userId: recipientId,
        content: event.data,
        chatRoomId: chatId,
        createdAt: new Date().toISOString(),
      };
      dispatch(appendMessage(incomingMessage));
    });
    return () => socket.close();
  }, [chatId]);

  console.log(`in message screen with chat id : ${chatId}`);

  return isLoadingMessages ? (
    <LoadingScreen />
  ) : (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        inverted
        contentContainerStyle={{paddingHorizontal: 12}}
        data={messages}
        style={{flex: 1}}
        renderItem={({item}) => {
          const isCurrentUsersMessage = item.userId === userId;
          return (
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                backgroundColor: isCurrentUsersMessage ? '#9B4B78' : '#262626',
                alignSelf: isCurrentUsersMessage ? 'flex-end' : 'flex-start',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                borderTopRightRadius: isCurrentUsersMessage ? 4 : 16,
                borderTopLeftRadius: isCurrentUsersMessage ? 16 : 4,
              }}>
              <Text style={{color: '#F5F5E8'}}>{item.content}</Text>
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingBottom: 16,
        }}>
        <Input
          onChangeText={text => {
            setMessage(text);
          }}
          style={{color: 'white'}}
          inputContainerStyle={{
            width: '96%',
            borderRadius: 50,
            borderColor: 'white',
            borderWidth: 0.5,
            backgroundColor: 'transparent',
          }}
          placeholder="Message..."
          rightIcon={
            message?.length > 0 ? (
              <Icon
                name="paper-plane"
                size={20}
                style={{marginRight: 10}}
                onPress={() => {
                  const msg: ChatMessage = {
                    chatRoomId: chatId,
                    content: message,
                    createdAt: new Date().toISOString(),
                    userId: userId,
                  };
                  dispatch(appendMessage(msg));
                  socketRef.current!.send(message);
                  setMessage('');
                }}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
