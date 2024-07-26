import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {fetchFavorites} from '../api/api';
import {useQuery} from '@tanstack/react-query';
import {IAnimePage} from '../exports/interface';
import {tw} from '../exports/exports';
import DefaultCard from './DefaultCard';

export default function Favorites() {
  let {data: favorites} = useQuery<IAnimePage>({
    queryKey: ['favorites', 'home'],
    queryFn: async () => await fetchFavorites({page: 1}),
  });

  // useEffect(() => {
  //   console.log(favorites);
  // }, []);
  return (
    <View style={tw('px-4 gap-4')}>
      <Text style={tw('text-xl')}>Trending</Text>

      <ScrollView horizontal contentContainerStyle={tw('gap-2 py-4')}>
        {favorites?.results.map(({image, id, title}) => {
          return (
            <DefaultCard image={image} id={id} title={title} key={id}></DefaultCard>
          );
        })}
      </ScrollView>
    </View>
  );
}
