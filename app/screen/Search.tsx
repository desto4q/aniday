import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import React, {
  ReactEventHandler,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, tw} from '../exports/exports';
import {GoSearch, GoTag} from 'rn-icons/go';
import {FaCaretLeft} from 'rn-icons/fa';
import {useQuery} from '@tanstack/react-query';
import {queryAnime} from '../api/api';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Navigators from '../components/Navigators';

export default function Search() {
  let [searchTerm, setSearchTerm] = useState<string>('naruto');
  let [finalTerm, setFinalTerm] = useState<string>('naruto');
  let [pid, setPid] = useState<number>(1);
  let handleInput = (e: string) => {
    setSearchTerm(e);
  };

  let {
    data: searchResults,
    isFetching,
    isError,
  } = useQuery<IAnimeEntry>({
    queryKey: [finalTerm, pid],
    queryFn: async () => await queryAnime({query: finalTerm, pid: pid}),
  });

  let handleDone = () => {
    setFinalTerm(searchTerm);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [pid]);

  return (
    <SafeAreaView style={tw('gap-2')}>
      <View style={tw('mx-4 h-14 flex-row bg-slate-700 rounded-md')}>
        <TouchableOpacity
          style={[
            tw(' items-center px-3 justify-center rounded-r-md'),
            {
              // aspectRatio: 1 / 1,
            },
          ]}>
          <FaCaretLeft
            style={tw('self-center')}
            fill={colors.yellow[500]}
            size={22}
          />
        </TouchableOpacity>
        <TextInput
          value={searchTerm}
          onChangeText={handleInput}
          style={tw('h-full  flex-1')}
        />
        <TouchableOpacity
          onPress={handleDone}
          style={[
            tw(' items-center px-3 justify-center bg-yellow-500 rounded-r-md'),
            {
              // aspectRatio: 1 / 1,
            },
          ]}>
          <GoSearch style={tw('self-center')} size={22} />
        </TouchableOpacity>
      </View>
      <View style={tw('px-4')}>
        <ScrollView contentContainerStyle={tw('pb-60')}>
          {isError ? (
            <></>
          ) : isFetching ? (
            <Loading />
          ) : (
            <View style={tw('flex-row gap-2 flex-wrap')}>
              {searchResults?.results.map(item => {
                return (
                  <SearchCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                  />
                );
              })}
            </View>
          )}

          <Navigators
            nextPage={searchResults?.hasNextPage}
            pid={pid}
            setPid={setPid}></Navigators>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
interface IAnimeEntry {
  currentPage: number;
  hasNextPage: boolean;
  results: ISearchResults[];
}

interface ISearchResults {
  id: string;
  title: string;
  url?: string;
  image: string;
  releaseDate?: string;
  subOrDub?: string;
}

let SearchCard = ({id, title, image}: ISearchResults) => {
  let navigation: any = useNavigation();
  let changeScreen = () => {
    navigation.navigate('Info', {
      id: id,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        changeScreen();
      }}
      style={[
        tw('   rounded-md gap-1 relative'),
        {
          width: 240 * (4 / 6),
        },
      ]}>
      <FastImage
        source={{uri: image}}
        style={[tw('h-60 w-full rounded-md'), {aspectRatio: 4 / 6}]}
      />
      <Text numberOfLines={2}>{title}</Text>
      <TouchableOpacity
        style={tw(
          'absolute z-20 top-0 bg-yellow-600 p-2 right-0 m-1 rounded-sm',
        )}>
        <GoTag />
      </TouchableOpacity>
      <LinearGradient
        colors={[`${colors.neutral[900]}b3`, 'rgba(0,0,0,0)']}
        renderToHardwareTextureAndroid
        style={tw('h-60 w-full absolute')}></LinearGradient>
    </TouchableOpacity>
  );
};

let Loading = () => {
  return (
    <View style={tw('w-full h-96 justify-center items-center')}>
      <ActivityIndicator size={32} color={colors.yellow[500]} />
    </View>
  );
};
