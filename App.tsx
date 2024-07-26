import { View, Text } from 'react-native'
import React from 'react'
import Main from './app/Main'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Main/>
    </NavigationContainer>
  )
}