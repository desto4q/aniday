import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FaCaretLeft} from 'rn-icons/fa';
import {colors, tw} from '../exports/exports';
import {useNavigation} from '@react-navigation/native';

export default function GoBack() {
  let {goBack} = useNavigation();

  return (
    <TouchableOpacity
      style={tw(' h-full justify-center items-center px-1')}
      onPress={() => {
        goBack();
      }}>
      <FaCaretLeft size={22} fill={colors.yellow[500]} />
    </TouchableOpacity>
  );
}
