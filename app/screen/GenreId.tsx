import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {tw} from '../exports/exports';
import GoBack from '../components/GoBack';
import {useQuery} from '@tanstack/react-query';
import {fetchGenre} from '../api/api';
import {ErrorComp, Loading} from '../components/Loading';
import DefaultCard from '../components/DefaultCard';
import {IAnimePage} from '../exports/interface';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigators from '../components/Navigators';

type GenreParams = {
  id: string;
  title: string;
};
export default function GenreId({route}: any) {
  let {id, title}: GenreParams = route.params;
  let [pid, setPid] = useState<number>(1);
  let {
    data: genreResult,
    isError,
    isLoading,
    refetch,
  } = useQuery<IAnimePage>({
    queryKey: ['id',pid, 'genre'],
    queryFn: async () => await fetchGenre({id: id, page: 1}),
  });
  
  return (
    <SafeAreaView style={tw('gap-3')}>
      <View style={tw('h-14   items-center flex-row  gap-2')}>
        <GoBack />
        <Text style={tw('text-xl')}>{title.slice(0, 12)}</Text>
        <View style={tw('ml-auto')}>
          <Navigators
            nextPage={genreResult?.hasNextPage}
            pid={pid}
            setPid={setPid}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={tw(
          'pb-40 justify-center flex-row gap-2 flex-wrap',
        )}>
        {isError ? (
          <ErrorComp refetch={refetch}></ErrorComp>
        ) : isLoading ? (
          <Loading />
        ) : (
          genreResult?.results.map(item => {
            return (
              <DefaultCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
