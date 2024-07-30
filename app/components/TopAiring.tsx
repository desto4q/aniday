import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {IAnimePage} from '../exports/interface';
import {fetchPopular, fetchTop} from '../api/api';
import {tw} from '../exports/exports';
import DefaultCard from './DefaultCard';
import {useNavigation} from '@react-navigation/native';
import DTitle from './DTitle';

export default function TopAiring() {
  let {data: release} = useQuery<IAnimePage>({
    queryKey: ['Popular', 'home'],
    queryFn: async () => await fetchPopular({page: 1}),
  });
  let navigate: any = useNavigation();
  let navigateTO = () => {
    navigate.navigate('Dscreen', {
      type: 'popular',
    });
  };
  return (
    <View style={tw('px-4 gap-3')}>
      <DTitle title="Popular" navigateTO={navigateTO} />

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
