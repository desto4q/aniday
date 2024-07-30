import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchMovies, fetchPopular, fetchRecentEpisodes} from '../api/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, tw} from '../exports/exports';
import {FaCaretLeft, FaCaretRight} from 'rn-icons/fa';
import {IAnimePage} from '../exports/interface';
import DefaultCard from '../components/DefaultCard';
import {ErrorComp, Loading} from '../components/Loading';
import GoBack from '../components/GoBack';

interface QueryFns {
  recent: (pid: number) => Promise<any>;
  movies: (pid: number) => Promise<any>;
  popular: (pid: number) => Promise<any>;
}

// Define a type for the keys of QueryFns
type QueryFnKeys = keyof QueryFns;

let Queryfns: QueryFns = {
  recent: (pid: number) => fetchRecentEpisodes({page: pid}),
  movies: (pid: number) => fetchMovies({page: pid}),
  popular: (pid: number) => fetchPopular({page: pid}),
};

export default function DScreen({route}: any) {
  // Use the defined type for 'type'
  let {type}: {type: QueryFnKeys} = route.params;
  let [pid, setPid] = useState<number>(1);

  let {
    data: queryResults,
    isLoading,
    isError,
    refetch,
  } = useQuery<IAnimePage>({
    queryKey: [type, pid, 'Dscreen'],
    queryFn: () => Queryfns[type](pid),
    _optimisticResults: 'optimistic', // Call the function with pid
  });
  // let configure = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  // };
  let configure = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);
  return (
    <SafeAreaView>
      <View style={tw('px-3 gap-2')}>
        <View style={tw('h-14  gap-3 flex-row items-center')}>
          <GoBack />
          <Text style={tw('text-xl capitalize')}>{type}</Text>
          <View style={tw('h-full ml-auto items-center justify-center')}>
            <DNavigator
              pid={pid}
              setPid={setPid}
              nextPage={queryResults?.hasNextPage}
              other={configure}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={tw(
            'pb-40 flex-row gap-2 flex-wrap justify-center',
          )}>
          {isError ? (
            <ErrorComp refetch={refetch}></ErrorComp>
          ) : isLoading ? (
            <Loading />
          ) : (
            queryResults?.results.map(item => {
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
      </View>
    </SafeAreaView>
  );
}

let DNavigator = ({
  pid,
  setPid,
  nextPage,
  other,
}: {
  pid: number;
  setPid: (e: number) => any;
  nextPage?: boolean;
  other: () => void;
}) => {
  let goFoward = () => {
    if (nextPage) {
      setPid((pid += 1));
      other();
      return;
    }
  };

  let goBack = () => {
    if (pid > 1) {
      setPid((pid -= 1));
      other();
      return;
    }
  };
  return (
    <View style={tw('flex-row  self-center gap-4 items-center')}>
      <TouchableOpacity
        onPress={goBack}
        style={tw(
          `p-2 bg-yellow-500 rounded-md justify-center items-center ${pid < 2 ? 'bg-opacity-50' : ''}`,
        )}>
        <FaCaretLeft size={22} />
      </TouchableOpacity>
      <TextInput
        style={tw('bg-slate-600 rounded-md px-2 text-center')}
        defaultValue={String(pid)}
        keyboardType="numeric"
        onTextInput={e => {
          let text = e.nativeEvent.text;
        }}
        onSubmitEditing={e => {
          let text = e.nativeEvent.text;
          let digit = Number(text);
          setPid(digit);
        }}></TextInput>
      <TouchableOpacity
        disabled={!nextPage}
        onPress={goFoward}
        style={tw(
          `p-2 bg-yellow-500 rounded-md justify-center items-center ${
            !nextPage ? 'bg-opacity-50' : ''
          }`,
        )}>
        <FaCaretRight size={22} />
      </TouchableOpacity>
    </View>
  );
};
