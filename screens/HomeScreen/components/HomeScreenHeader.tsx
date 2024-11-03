import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {fontFamily} from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../../type';

const HomeScreenHeader: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.instagramText}>Instagram</Text>
      <View style={{flexDirection: 'row', gap: 16}}>
        <Icon name="hearto" color={'#FFF'} size={24} />
        <Icon
          name="message1"
          color={'#FFF'}
          size={24}
          onPress={() => navigation.navigate('ChatScreen')}
        />
      </View>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  instagramText: {
    fontFamily: fontFamily.amsterdam,
    color: 'white',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
