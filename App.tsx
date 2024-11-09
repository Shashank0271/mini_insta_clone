import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackScreen from './screens/StackScreen/StackScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
