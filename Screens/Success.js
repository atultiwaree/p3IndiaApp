import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Success = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/tick-mark.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Data saved successfully</Text>
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
  },
});
