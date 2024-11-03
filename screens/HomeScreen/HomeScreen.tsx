import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import ProfileCircle from './components/ProfileCircle';

const HomeScreen: FC = () => {
  return (
    <View style={styles.screen}>
      <ProfileCircle />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#000'},
});
