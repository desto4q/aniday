import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {IAnimePage} from '../exports/interface';
import {fetchPopular, fetchTop} from '../api/api';
import {tw} from '../exports/exports';
import DefaultCard from './DefaultCard';

export default function TopAiring() {
  let {data: release} = useQuery<IAnimePage>({
    queryKey: ['Popular', 'home'],
    queryFn: async () => await fetchPopular({page: 1}),
  });
  return (
    <View style={tw('px-4 gap-4')}>
      <Text style={tw('text-xl')}>Popular</Text>

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
