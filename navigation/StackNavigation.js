import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import {useSelector} from 'react-redux';
import Home from '../Screens/Home';
import RequestProduct from '../Screens/RequestProduct';
const Stack = createNativeStackNavigator();

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
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="productRequest"
            component={RequestProduct}
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
