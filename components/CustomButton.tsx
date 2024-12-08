import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {fontFamily} from '../constants/fonts';

interface CustomButtonProps {
  label: string;
  labelStyle?: TextStyle;
  onPress: (...args: any) => unknown;
  wrapperProps?: ViewStyle;
  iconPosition?: 'left' | 'right';
  icon?: React.ReactNode;
}

const CustomButton: FC<CustomButtonProps> = ({
  label,
  labelStyle,
  onPress,
  wrapperProps,
  iconPosition = 'left',
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, wrapperProps]}>
      {icon && iconPosition === 'left' ? (
        <View style={{marginRight: 8}}>{icon}</View>
      ) : null}
      <Text style={[styles.text, labelStyle]}>{label}</Text>
      {icon && iconPosition === 'right' ? (
        <View style={{marginLeft: 8}}>{icon}</View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CustomButton;

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
    flexDirection: 'row',
  },
});
