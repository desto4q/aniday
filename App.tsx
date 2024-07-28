import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import Main from './app/Main';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {colors} from './app/exports/exports';

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.slate[900],
  },
};
export default function App() {
  return (
    <>
      <StatusBar backgroundColor={colors.slate[900]} />
      <NavigationContainer theme={myTheme}>
        <Main />
      </NavigationContainer>
    </>
  );
}
