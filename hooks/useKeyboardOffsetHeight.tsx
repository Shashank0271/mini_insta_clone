import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default function useKeyboardOffsetHeight() {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);
  useEffect(() => {
    const KeyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardOffsetHeight(e.endCoordinates.height);
    });
    const KeyboardDidHide = Keyboard.addListener('keyboardDidHide', e => {
      setKeyboardOffsetHeight(0);
    });

    // IOS only -----
    const KeyboardWillHide = Keyboard.addListener('keyboardWillHide', e => {
      setKeyboardOffsetHeight(0);
    });
    const KeyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardOffsetHeight(e.endCoordinates.height);
    });

    return () => {
      KeyboardDidShow.remove();
      KeyboardDidHide.remove();
      KeyboardWillHide.remove();
      KeyboardWillShow.remove();
    };
  });
  return keyboardOffsetHeight;
}
