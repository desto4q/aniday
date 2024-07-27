import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Rtab from './Rtab';
import Info from '../screen/Info';

export default function Rstack() {
  let Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        // animation:"flip"
      }}>
      <Stack.Screen name="Tabs" component={Rtab} />
      <Stack.Screen name="Info" component={Info} />
    </Stack.Navigator>
  );
}
