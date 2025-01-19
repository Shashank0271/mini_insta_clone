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
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;
