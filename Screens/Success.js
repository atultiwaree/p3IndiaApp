import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { COLORS } from '../Utility';

const Success = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/tick-mark.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Data saved successfully</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Rubik',
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.darkGreen,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
  },
});
