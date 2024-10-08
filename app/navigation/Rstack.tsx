import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Rtab from './Rtab';
import Info from '../screen/Info';
import DScreen from '../screen/DScreen';
import WatchScreen from '../screen/WatchScreen';
import GenreId from '../screen/GenreId';

export default function Rstack() {
  let Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: true,
        // animation:"fade_from_bottom",
        // animationDuration: 500,
      }}>
      <Stack.Screen name="Tabs" component={Rtab} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Watch" component={WatchScreen} />
      <Stack.Screen
        name="Dscreen"
        component={DScreen}
        initialParams={{
          type: 'Movies',
        }}
      />
      <Stack.Screen name="GenreId" component={GenreId} />
    </Stack.Navigator>
  );
}
