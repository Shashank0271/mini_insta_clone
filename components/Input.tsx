import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface InputProps extends TextInputProps {
  underlineColorAndroid?: string;
  secure?: boolean;
  label?: string;
  leftIcon?: React.ReactNode;
  inputContainerStyle?: ViewStyle;
  onChangeText: (e: string) => void;
}

export default function Input({
  underlineColorAndroid = 'transparent',
  secure = false,
  label,
  leftIcon,
  inputContainerStyle,
  onChangeText,
  ...props
}: InputProps) {
  //we have to show the eye when the text input is focused
  //when focus is removed AND the text input is empty then we remove the eye
  const [secureText, setSecureText] = useState<boolean | undefined>(
    secure ? true : undefined,
  );
  const [showEye, setShowEye] = useState(false);
  const [contentLength, setContentLength] = useState(0);

  return (
    <>
      {label && label.length > 0 ? (
        <Text style={{fontWeight: '800', fontSize: 16, color: '#818589'}}>
          {label}
        </Text>
      ) : null}
      <View style={[styles.inputContainer, inputContainerStyle]}>
        {leftIcon ? <View style={{marginRight: 5}}>{leftIcon}</View> : null}
        <TextInput
          secureTextEntry={secureText}
          underlineColorAndroid={underlineColorAndroid}
          onChangeText={onChangeText}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const contentLength = e.nativeEvent.text.length;
            setContentLength(contentLength);
          }}
          onFocus={() => {
            if (secure) setShowEye(true);
          }}
          onBlur={() => {
            if (secure && contentLength === 0) {
              setShowEye(false);
            }
          }}
          placeholderTextColor={'grey'}
          style={{
            flex: 1,
            fontSize: 18,
            color: '#333',
          }}
          {...props}
        />
        {!showEye ? null : secureText === true ? (
          <Icon
            name="eye-slash"
            color={'grey'}
            size={24}
            onPress={() => setSecureText(false)}
          />
        ) : secureText === false ? (
          <Icon
            name="eye"
            color={'grey'}
            size={24}
            onPress={() => setSecureText(true)}
          />
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
  },
});
