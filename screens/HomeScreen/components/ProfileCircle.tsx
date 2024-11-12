import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {fontFamily} from '../../../constants/fonts';
import {useSelector} from 'react-redux';
import {UserState} from '../../../redux/reducers/appUser';
import {AppState} from '../../../redux/store';

//  TODO : remove optional

interface ProfileCircleProps {
  imageUrl: string;
  name: string;
  showAddIcon?: boolean;
}

const ProfileCircle: FC<ProfileCircleProps> = ({
  showAddIcon = false,
  name,
  imageUrl,
}: ProfileCircleProps) => {
  return (
    <View>
      <ImageBackground
        borderRadius={100}
        source={{uri: imageUrl}}
        resizeMode="cover"
        style={{width: 70, height: 70, marginBottom: 8}}>
        {showAddIcon && (
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="pluscircle" size={26} color={'#3893f5'} />
          </TouchableOpacity>
        )}
      </ImageBackground>
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
};

export default ProfileCircle;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    right: -3,
    bottom: -4,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 500,
    backgroundColor: '#FFF',
  },
  nameText: {color: 'white', fontFamily: fontFamily.medium},
});
