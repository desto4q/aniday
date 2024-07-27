import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchRecentEpisodes} from '../api/api';
import {colors, tw} from '../exports/exports';
import {IAnimeEntry, IAnimePage} from '../exports/interface';
import DefaultCard from './DefaultCard';
import {useNavigation} from '@react-navigation/native';

export default function RecentReleases() {
  let {data: release} = useQuery<IAnimePage>({
    queryKey: ['recent', 'home'],
    queryFn: async () => await fetchRecentEpisodes({page: 1}),
  });

  let navigate: any = useNavigation();
  let navigateTO = () => {
    navigate.navigate('Dscreen', {
      type: 'recent',
    });
  };
  return (
    <View style={tw('px-4 gap-3')}>
      <TouchableOpacity style={tw('p-1')} onPress={navigateTO}>
        <Text style={tw('text-xl')}>RecentReleases</Text>
      </TouchableOpacity>

      <ScrollView horizontal contentContainerStyle={tw('gap-2 ')}>
        {release?.results.slice(0, 10).map(({image, id, title}) => {
          return (
            <DefaultCard
              image={image}
              id={id}
              title={title}
              key={id}></DefaultCard>
          );
        })}
      </ScrollView>
    </View>
  );
}
