import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Rtab from './Rtab';

export default function Rstack() {
   let Stack = createNativeStackNavigator();
   return (
      <Stack.Navigator
         screenOptions={{
            headerShown: false,
         }}>
         <Stack.Screen name="Tabs" component={Rtab} />
      </Stack.Navigator>
   );
}
