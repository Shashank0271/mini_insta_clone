import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import StackScreen from './screens/StackScreen/StackScreen';

function App() {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
