import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import CarouselSlider from '../components/Carousel';
import {tw} from '../exports/exports';
import {GoSearch} from 'rn-icons/go';
import {SafeAreaView} from 'react-native-safe-area-context';
import RecentReleases from '../components/RecentReleases';
import TopAiring from '../components/TopAiring';
import Favorites from '../components/Favorites';

export default function Home() {
  return (
    <SafeAreaView style={tw('')}>
      <ScrollView
        style={tw(' h-full')}
        contentContainerStyle={tw('gap-3 pb-20')}>
        <View style={tw('h-14  flex-row items-center px-4')}>
          <Text style={tw('text-xl')}>AniPlay</Text>
          <TouchableOpacity style={tw('ml-auto p-2')}>
            <GoSearch size={22} fill={'white'} />
          </TouchableOpacity>
        </View>
        <CarouselSlider />
        <RecentReleases />
        <TopAiring />
        <Favorites />
      </ScrollView>
    </SafeAreaView>
  );
}
