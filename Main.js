import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigation from './navigation/StackNavigation'
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Main = () => {
  return (

    <View style = {{flex : 1}}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <StackNavigation/>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({})