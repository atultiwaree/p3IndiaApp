import {configureStore, combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

//Importin my Rducers (Normal)
// import testReducer from '../Slices/NormalSlices/TestSlice';

import {networkSlice} from './Slices/Network/networkSlice';
import reduxStorage from '../MMKVConfig';
import testReducer from './Slices/Normal/testSlice';
import authReducer from './Slices/Normal/authSlice';

const persistConfig = {
  timeout: 2000,
  key: 'root',
  storage: reduxStorage,
};

const combined_reducer = combineReducers({
  test: testReducer,
  auth: authReducer,
  [networkSlice.reducerPath]: networkSlice.reducer,
});

const persist_reducer = persistReducer(persistConfig, combined_reducer);

const store = configureStore({
  reducer: persist_reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(networkSlice.middleware),
});

export default store;
