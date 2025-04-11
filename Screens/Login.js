import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {COLORS, WIDTH_SIZES} from '../Utility';
import {useDispatch, useSelector} from 'react-redux';
import {increment} from '../Redux/Slices/Normal/testSlice';
import {
  useLazyTestApiQuery,
  useLoginMutation,
} from '../Redux/Slices/Network/networkSlice';
import {currentUserInformation} from '../Redux/Slices/Normal/authSlice';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const Login = () => {
  const navigation = useNavigation();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const dispatch = useDispatch();



  const [login] = useLoginMutation();

  const handleLogin = async () => {
    if (password !== '' || email !== '') {
      const {data, error} = await login({
        body: {
          email: email,
          password: password,
        },
      });

      if (data) {
        dispatch(currentUserInformation(data));

        Toast.show({type : ALERT_TYPE.SUCCESS, title : 'Logged In', autoClose : true, })
        navigation.navigate("home")

      }


      if(error) {
        Toast.show({type : ALERT_TYPE.DANGER, title : 'Something wetn wrong!'})
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/pb3.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={[
          styles.input,
          {borderColor: emailFocused ? COLORS.darkGreen : COLORS.borderGreen},
        ]}
        placeholder="Email or Username"
        placeholderTextColor="#888"
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        onChangeText={t => setEmail(t)}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={[
          styles.input,
          {
            borderColor: passwordFocused
              ? COLORS.darkGreen
              : COLORS.borderGreen,
          },
        ]}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={t => setPassword(t)}
        value={password}
      />

      <Text style={styles.forgotText}>Forgot password?</Text>

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: WIDTH_SIZES[32],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: 100,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: COLORS.borderGreen,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'Rubik-Regular',
    color: '#1e1e1e',
  },
  forgotText: {
    fontSize: 14,
    color: '#1e1e1e',
    marginBottom: 20,
    fontFamily: 'Rubik-Regular',
  },
  loginBtn: {
    width: '100%',
    height: 45,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Rubik-SemiBold',
  },
});
