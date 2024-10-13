import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Input({
  backgroundColor = 'white',
  borderColor = 'transparent',
  borderWidth = 1,
  underlineColorAndroid = 'transparent',
  secure,
  label,
  leftIcon,
  borderRadius = 8,
  onChangeText,
  ...props
}: {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  underlineColorAndroid?: string;
  secure?: boolean;
  label?: string;
  leftIcon?: React.ReactNode;
  borderRadius?: number;
  onChangeText: (e: string) => void;
} & TextInputProps) {
  //we have to show the eye when the text input is focused
  //when focus is removed AND the text input is empty then we remove the eye
  const [secureText, setSecureText] = useState<boolean | undefined>(
    secure === true ? true : undefined,
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
      <View
        style={[
          {
            borderColor: borderColor,
            borderWidth: borderWidth,
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
          },
          styles.inputContainer,
        ]}>
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
            setShowEye(true);
          }}
          onBlur={() => {
            if (contentLength === 0) {
              setShowEye(false);
            }
          }}
          placeholderTextColor={'grey'}
          style={{flex: 1, fontSize: 18, color: 'black'}}
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
    justifyContent: 'center',
  },
});
