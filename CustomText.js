import React from 'react';
import {Text, StyleSheet} from 'react-native';

const capitalizeFirstLetter = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const CustomTitleText = ({children, style, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {capitalizeFirstLetter(children)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
    color: '#1e1e1e', 
  },
});

export default CustomTitleText;
