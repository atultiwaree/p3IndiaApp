import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Main from './Main';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import {Provider} from 'react-redux';
import store from './Redux/store';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import BootSplash from 'react-native-bootsplash';


const persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
          <AlertNotificationRoot>

          
          <Main />
          </AlertNotificationRoot>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
