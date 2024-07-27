import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {fetchFavorites, fetchMovies} from '../api/api';
import {useQuery} from '@tanstack/react-query';
import {IAnimePage} from '../exports/interface';
import {tw} from '../exports/exports';
import DefaultCard from './DefaultCard';
import {useNavigation} from '@react-navigation/native';

export default function Favorites() {
  let {data: favorites} = useQuery<IAnimePage>({
    queryKey: ['Movies', 'home'],
    queryFn: async () => await fetchMovies({page: 1}),
  });
  let navigate: any = useNavigation();
  let navigateTO = () => {
    navigate.navigate('Dscreen', {
      type: 'movies',
    });
  };
  // useEffect(() => {
  //   console.log(favorites);
  // }, []);
  return (
    <View style={tw('px-4 gap-3')}>
      <TouchableOpacity onPress={navigateTO}>
        <Text style={tw('text-xl')}>Movies</Text>
      </TouchableOpacity>

      <ScrollView horizontal contentContainerStyle={tw('gap-2 ')}>
        {favorites?.results.slice(0, 10).map(({image, id, title}) => {
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
