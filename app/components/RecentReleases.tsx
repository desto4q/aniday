import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchRecentEpisodes} from '../api/api';
import {colors, tw} from '../exports/exports';
import {IAnimeEntry, IAnimePage} from '../exports/interface';
import LinearGradient from 'react-native-linear-gradient';
import {GoTag} from 'rn-icons/go';
import DefaultCard from './DefaultCard';

export default function RecentReleases() {
  let {data: release} = useQuery<IAnimePage>({
    queryKey: ['recent', 'home'],
    queryFn: async () => await fetchRecentEpisodes({page: 1}),
  });
  return (
    <View style={tw('px-4 gap-4')}>
      <Text style={tw('text-xl')}>RecentReleases</Text>

      <ScrollView horizontal contentContainerStyle={tw('gap-2 py-4')}>
        {release?.results.map(({image, id, title}) => {
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
