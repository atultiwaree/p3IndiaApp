// navigation/StackNavigation.js

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import RequestProduct from '../Screens/RequestProduct';
import Success from '../Screens/Success';
import CustomTitleText from '../CustomText';
import OrderSummaryScreen from '../Screens/OrderSummaryScreen';

const Stack = createNativeStackNavigator();

// Common header style to remove shadow/elevation
const noShadowHeaderOptions = {
  headerShown: true,
  headerShadowVisible: false, // for iOS
  headerStyle: {
    elevation: 0, // for Android
    shadowOpacity: 0, // for iOS
    borderBottomWidth: 0, // fallback for web/others
    backgroundColor: '#fff', // optional
  },
};

const StackNavigation = () => {
  const loggedInUser = useSelector(state => state.auth.user.token);
  console.log(loggedInUser);

  return (
    <Stack.Navigator initialRouteName="home">
      {!loggedInUser ? (
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            ...noShadowHeaderOptions,
            headerTitle: () => <CustomTitleText>login</CustomTitleText>,
            headerBackTitleStyle: {
              fontFamily: 'Rubik-Regular',
            },
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              ...noShadowHeaderOptions,
              headerTitle: () => <CustomTitleText>home</CustomTitleText>,
              headerBackTitleStyle: {
                fontFamily: 'Rubik-Regular',
              },
            }}
          />

          <Stack.Screen
            name="productRequest"
            component={RequestProduct}
            options={{
              ...noShadowHeaderOptions,
              headerTitle: () => (
                <CustomTitleText>product request</CustomTitleText>
              ),
              headerBackTitleStyle: {
                fontFamily: 'Rubik-Medium',
              },
            }}
          />

          <Stack.Screen
            name="OrderSummary"
            component={OrderSummaryScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
