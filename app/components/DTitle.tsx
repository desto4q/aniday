import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, tw} from '../exports/exports';
import {FaLink} from 'rn-icons/fa';
import {GoLink, GoLinkExternal} from 'rn-icons/go';

export default function DTitle({
  title,
  navigateTO,
}: {
  title: string;
  navigateTO: () => any;
}) {
  return (
    <TouchableOpacity
      style={tw('p-1 flex-row items-center gap-3')}
      onPress={navigateTO}>
      <Text style={tw('text-xl')}>{title}</Text>
      <GoLinkExternal size={18} fill={colors.yellow[600]} />
    </TouchableOpacity>
  );
}
