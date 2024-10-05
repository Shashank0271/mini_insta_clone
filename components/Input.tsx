import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
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
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  underlineColorAndroid: string;
  secure?: boolean;
  label?: string;
  leftIcon?: string;
  borderRadius: number;
  onChangeText: (e: string) => void;
} & TextInputProps) {
  const [secureText, setSecureText] = useState<boolean | undefined>(undefined);
  return (
    <>
      {label && label.length > 0 ? (
        <Text style={{fontWeight: '900', fontSize: 16}}>{label}</Text>
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
            if (secure) {
              if (contentLength > 0) {
                setSecureText(true);
              } else {
                setSecureText(undefined);
              }
            }
          }}
          placeholderTextColor={'grey'}
          style={{flex: 1, fontSize: 18}}
          {...props}
        />
        {secureText === true ? (
          <Icon name="eye" size={24} onPress={() => setSecureText(false)} />
        ) : secureText === false ? (
          <Icon
            name="eye-slash"
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
