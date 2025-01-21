import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackScreen from './screens/Navigation/StackScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SheetProvider} from 'react-native-actions-sheet';
import './utils/sheet';
/**
 * search for another user -> sep tab for this
 * send follow request
 * other user accepts it
 * view his post
 * like it
 * comment on it
 * 
 * view my followers and following -> on clicking the respective section in profile page
 */

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SheetProvider>
          <NavigationContainer>
            <StackScreen />
          </NavigationContainer>
        </SheetProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
