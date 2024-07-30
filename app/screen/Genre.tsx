import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {tw} from '../exports/exports';
import {useQuery} from '@tanstack/react-query';
import {fetchgenreList} from '../api/api';
import {ErrorComp, Loading} from '../components/Loading';
import {useNavigation} from '@react-navigation/native';

type GenreListType = {
  id: string;
  title: string;
};
export default function Genre() {
  let {
    data: genreList,
    isLoading,
    isError,
    refetch,
  } = useQuery<GenreListType[]>({
    queryKey: ['genreList'],
    queryFn: async () => await fetchgenreList(),
  });
  return (
    <SafeAreaView style={tw('px-3 py-2 gap-4')}>
      <Text style={tw('text-xl')}> Genre List</Text>
      <View>
        <ScrollView
          contentContainerStyle={tw(
            ' flex-row flex-wrap gap-2 pb-44  justify-center ',
          )}>
          {isError ? (
            <ErrorComp refetch={refetch} />
          ) : isLoading ? (
            <Loading />
          ) : genreList ? (
            genreList.map(({id, title}) => {
              return <GenreCard key={id} id={id} title={title} />;
            })
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

let GenreCard = ({id, title}: GenreListType) => {
  let navigation: any = useNavigation();
  let navigateTo = () => {
    navigation.navigate('GenreId', {
      id: id,
      title: title,
    });
  };
  return (
    <View
      style={[
        tw('w-[46%] bg-slate-800  p-4 rounded-md '),
        {
          aspectRatio: 3 / 4,
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigateTo();
        }}
        style={tw('h-full w-full items-center justify-center')}>
        <Text>{title}s</Text>
      </TouchableOpacity>
    </View>
  );
};
