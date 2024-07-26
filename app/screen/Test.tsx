import {View, Text, Animated, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {tw} from '../exports/exports';

export default function Test() {
  return (
    <View>
      <Text>sos</Text>
      <CustomPointer />
    </View>
  );
}

let CustomPointer = () => {
  let fadeAnim = useRef(new Animated.Value(0.2)).current;

  let [form, setForm] = useState<boolean>(false);
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  let changer = () => {
    console.log('yes');
    if (form == true) {
      fadeIn();
      setForm(false);
      return;
    }
    fadeOut();
    setForm(true);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        changer();
      }}>
      <Animated.View
        style={[
          tw('w-[200px] bg-red-200 h-[200px]'),
          {
            opacity: fadeAnim,
          },
        ]}></Animated.View>
    </TouchableOpacity>
  );
};
