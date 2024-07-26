import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacityComponent,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchAnimeInfo} from '../api/api';
import {colors, tw} from '../exports/exports';
import LinearGradient from 'react-native-linear-gradient';
import {GoDotFill} from 'rn-icons/go';
import {FaCaretDown, FaCaretUp} from 'rn-icons/fa';

import {IAnimeInfo} from '../exports/interface';

export default function Info({route}: any) {
  const {id} = route.params;
  let key = useMemo(() => ['info', id], [id]);
  let {
    data: info,
    isError,
    isFetching,
    refetch,
  } = useQuery<IAnimeInfo>({
    queryKey: key,
    queryFn: async () => await fetchAnimeInfo({id: id}),
  });

  return (
    <View style={{flex: 1}}>
      {isError ? (
        <Loading error={isError} refetch={refetch} />
      ) : isFetching ? (
        <Loading error={isError} refetch={refetch} />
      ) : (
        <>
          <View style={tw('relative')}>
            <View
              style={[
                tw('absolute w-full bg-red-200'),
                {
                  height: (height * 6) / 10,
                },
              ]}>
              <Image source={{uri: info?.image}} style={tw('h-full w-full')} />
            </View>
            <ScrollView
              contentContainerStyle={[
                {
                  paddingTop: height * (5 / 10),
                },
              ]}>
              <View
                style={tw('min-h-80 bg-slate-900 rounded-t-2xl py-6 px-4 ')}>
                <View style={tw(' self-center justify-center gap-2 ')}>
                  <View style={tw(' self-center flex-row gap-3 items-center ')}>
                    <Text>Date: {info?.releaseDate}</Text>
                    <GoDotFill size={12} fill={'white'} />
                    <Text>Episodes: {info?.totalEpisodes}</Text>
                  </View>
                  <Text style={tw('text-4xl text-center font-bold')}>
                    {info?.title}
                  </Text>
                  <Text style={tw(' text-center text-slate-500 font-bold')}>
                    {info?.otherName.trim()}
                  </Text>

                  <View style={tw('flex-row self-center gap-2')}>
                    {info?.genres
                      .splice(0, 3)
                      .map(e => <GenrePill item={e} key={e} />)}
                  </View>
                </View>
                <View
                  style={tw(
                    'h-[2px] w-full bg-slate-500 opacity-30 rounded-full my-4',
                  )}></View>
                <View style={tw('')}>
                  <DescBox item={String(info?.description)} />
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
}

let height = Dimensions.get('screen').height;
let Loading = ({error, refetch}: {error: boolean; refetch: () => any}) => {
  return (
    <View style={[{height: height / 2}, tw('w-full ')]}>
      <View style={tw('m-auto')}>
        <Text>loading...</Text>
      </View>
    </View>
  );
};

let GenrePill = ({item}: {item: string}) => {
  return (
    <TouchableOpacity
      style={tw('bg-yellow-500 bg-opacity-50 p-1 px-2 rounded-md')}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
};

let DescBox = ({item}: {item: string}) => {
  let [showDesc, setDesc] = useState<boolean>(true);

  let changer = () => {
    setDesc(!showDesc);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={changer}
        style={tw('flex-row items-center gap-2')}>
        <Text style={tw('font-bold text-lg ')}>Story:</Text>
        {showDesc ? (
          <FaCaretDown size={16} fill={colors.slate[500]} />
        ) : (
          <FaCaretUp size={16} fill={colors.slate[500]} />
        )}
      </TouchableOpacity>
      <View
        style={[
          {
            height: showDesc ? 'auto' : 0,
          },
        ]}>
        <Text style={tw('text-slate-500')}>{item}</Text>
      </View>
    </View>
  );
};
