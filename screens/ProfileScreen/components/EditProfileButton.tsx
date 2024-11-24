import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {fontFamily} from '../../../constants/fonts';

const EditProfileButton: FC = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button}>
      <Text style={styles.text}>Edit profile</Text>
    </TouchableOpacity>
  );
};

export default EditProfileButton;

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: '#FFF',
  },
  button: {
    width: '100%',
    backgroundColor: '#181b21',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 16,
  },
});
