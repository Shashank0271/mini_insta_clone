import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../../redux/store';
import {fontFamily} from '../../../constants/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';


interface ProfileScreenHeaderProps {
  onPress: () => void;
}

const ProfileScreenHeader: FC<ProfileScreenHeaderProps> = ({onPress}) => {
  const {appUser} = useSelector((state: AppState) => state.user);
  return (
    <View style={styles.profileScreenHeaderContainer}>
      <View style={styles.headerLeft}>
        <FeatherIcons
          name="lock"
          size={18}
          color={'#FFF'}
        />
        <Text style={styles.text}>{appUser.name}</Text>
      </View>
      <MaterialIcons name="logout" color={'#FFF'} size={24} onPress={onPress} />
    </View>
  );
};

export default ProfileScreenHeader;

const styles = StyleSheet.create({
  profileScreenHeaderContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  headerLeft: {flexDirection: 'row', gap: 6},
});
