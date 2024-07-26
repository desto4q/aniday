import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CarouselSlider from '../components/Carousel';
import {tw} from '../exports/exports';
import {GoSearch} from 'rn-icons/go';

export default function Home() {
  return (
    <View style={tw('')}>
      <View style={tw('h-14  flex-row items-center px-4')}>
        <Text style={tw('text-xl')}>AniPlay</Text>
        <TouchableOpacity style={tw('ml-auto p-2')}>
          <GoSearch size={22} fill={'white'} />
        </TouchableOpacity>
      </View>
      <CarouselSlider />
    </View>
  );
}
