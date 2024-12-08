import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import useKeyboardOffsetHeight from '../hooks/useKeyboardOffsetHeight';

interface KeyboardAvoidingContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  headerAvailable?: boolean;
}

const KeyboardAvoidingContainer = ({
  children,
  backgroundColor = 'transparent',
}: KeyboardAvoidingContainerProps) => {
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.15,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: backgroundColor}}>
      {/* <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'red'}}
        keyboardVerticalOffset={40}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={{
          // flex: 1,
          // transform: [{translateY: animatedValue}],
        }}>
        {children}
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  contentContainer: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
