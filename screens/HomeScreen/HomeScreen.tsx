import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import ProfileCircle from './components/ProfileCircle';

const HomeScreen: FC = () => {
  return (
    <View>
      <ProfileCircle />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
