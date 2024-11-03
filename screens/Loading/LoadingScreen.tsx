import {StyleSheet, View} from 'react-native';
import React from 'react';
import LoaderKit from 'react-native-loader-kit';

const LoadingScreen = () => {
  return (
    <View style={styles.screen}>
      <LoaderKit
        style={styles.loadingIcon}
        name={'BallPulseSync'} // Optional: see list of animations below
        color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingIcon: {
    width: 50,
    height: 50,
  },
});
