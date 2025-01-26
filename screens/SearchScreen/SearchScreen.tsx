import {ToastAndroid, View} from 'react-native';
import React, {FC, useState} from 'react';
import Input from '../../components/Input';
import axios from 'axios';
import {API_BASEURL} from '../../constants/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../type';

const SearchScreen: FC = () => {
  const [searchedSid, setSearchedSid] = useState<string | undefined>();
  const navigation = useNavigation<RootStackNavigationProp>();

  useFocusEffect(
    React.useCallback(() => {
      setSearchedSid(undefined); // Reset state on screen focus
    }, []),
  );

  const fetchSidByUname = async (username: string) => {
    try {
      const response = await axios.get(`${API_BASEURL}user/sid/${username}`);
      console.log(`updating sid to : ${response.data['data']['supabaseId']}`);
      setSearchedSid(response.data['data']['supabaseId']);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const errorMessage = e.response?.data['apiError']['message'];
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 70,
        paddingHorizontal: 20,
      }}>
      <Input
        onChangeText={() => {}}
        onEndEditing={e => fetchSidByUname(e.nativeEvent.text)}
        rightIcon={
          <Icon
            name="search-sharp"
            color={'black'}
            size={24}
            onPress={() => {
              console.log(searchedSid);
              if (searchedSid) {
                navigation.navigate('ExploreProfileScreen', {
                  otherUserSID: searchedSid,
                });
              }
            }}
          />
        }
      />
    </View>
  );
};

export default SearchScreen;
