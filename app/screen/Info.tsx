import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacityComponent,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchAnimeInfo} from '../api/api';
import {colors, tw} from '../exports/exports';
import LinearGradient from 'react-native-linear-gradient';
import {GoDotFill} from 'rn-icons/go';
import {FaCaretDown, FaCaretLeft, FaCaretRight, FaCaretUp} from 'rn-icons/fa';

import {IAnimeInfo, IEpisode} from '../exports/interface';

export default function Info({route}: any) {
  const {id} = route.params;

  let {
    data: info,
    isError,
    isFetching,
    refetch,
  } = useQuery<IAnimeInfo>({
    queryKey: ['info', id],
    queryFn: async () => await fetchAnimeInfo({id: id}),
  });
  //   useEffect(() => {
  //     console.log(id);
  //   }, []);

  return (
    <View style={{flex: 1}}>
      <>
        <View style={tw('relative')}>
          <View
            style={[
              tw('absolute w-full '),
              {
                height: (height * 7) / 10,
              },
            ]}>
            {isError ? (
              <ErrorComp refetch={refetch} bg={false} />
            ) : isFetching ? (
              <>
                <View
                  style={tw('bg-slate-700 h-full items-center justify-center')}>
                  <ActivityIndicator size="large" color={colors.yellow[500]} />
                </View>
              </>
            ) : (
              <Image source={{uri: info?.image}} style={tw('h-full w-full')} />
            )}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              {
                paddingTop: height * (6 / 10),
              },
            ]}>
            <View style={tw('min-h-80 bg-slate-900 rounded-t-2xl py-6 px-4 ')}>
              {isError ? (
                <ErrorComp refetch={refetch} bg={false} />
              ) : isFetching ? (
                <View style={tw(' h-full items-center justify-center')}>
                  <ActivityIndicator size="large" color={colors.yellow[500]} />
                </View>
              ) : (
                <>
                  <View style={tw(' self-center justify-center gap-2 ')}>
                    <View
                      style={tw(' self-center flex-row gap-3 items-center ')}>
                      <Text>Date: {info?.releaseDate}</Text>
                      <GoDotFill size={12} fill={'white'} />
                      <Text>Episodes: {info?.totalEpisodes}</Text>
                      <GoDotFill size={12} fill={'white'} />
                      <Text style={tw('capitalize')}>
                        Type: {info?.subOrDub}
                      </Text>
                    </View>
                    <Text style={tw('text-4xl text-center font-bold')}>
                      {info?.title}
                    </Text>
                    <Text style={tw(' text-center text-slate-500 font-bold')}>
                      {info?.otherName.trim().replace(/\s+/g, ' ')}
                    </Text>

                    <View style={tw('flex-row self-center gap-2')}>
                      {info?.genres
                        .splice(0, 3)
                        .map(e => <GenrePill item={e} key={e} />)}
                    </View>
                    <View style={tw(' self-center items-center gap-2')}>
                      <Text>{info?.type}</Text>

                      <Text style={tw('capitalize')}>{info?.status}</Text>
                    </View>
                  </View>
                  <View
                    style={tw(
                      'h-[2px] w-full bg-slate-500 opacity-30 rounded-full my-4',
                    )}></View>
                  <View style={tw('')}>
                    <DescBox item={String(info?.description)} />
                  </View>
                  <View style={tw('mt-3 gap-3')}>
                    <Text style={tw('font-bold text-lg')}>Episode:</Text>
                    <EpisodePaginator Episodes={info?.episodes} />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </>
    </View>
  );
}

let height = Dimensions.get('screen').height;
let ErrorComp = ({refetch, bg}: {refetch: () => any; bg: boolean}) => {
  return (
    <View style={tw(`h-full w-full ${bg ? 'bg-slate-500' : null}`)}>
      <TouchableOpacity style={tw('p-2')} onPress={refetch}>
        <Text>refetch</Text>
      </TouchableOpacity>
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
  let [showDesc, setDesc] = useState<boolean>(false);

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
            height: showDesc ? 'auto' : 34,
            position: 'relative',
          },
        ]}>
        <Text style={tw('text-slate-500')}>{item}</Text>

        {!showDesc ? (
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}
            style={tw('absolute w-full bottom-0 h-full rounded-b-sm')}
          />
        ) : null}
      </View>
    </View>
  );
};
let EpisodePaginator = ({Episodes}: {Episodes?: IEpisode[]}) => {
  let [page, setPage] = useState<number>(1);
  const pageSize = 50;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const reversedEpisodes = [...(Episodes || [])].reverse();
  const paginatedData = reversedEpisodes.slice(startIndex, endIndex);

  let nextPage = () => {
    if (page < Math.ceil((Episodes?.length || 0) / pageSize)) {
      setPage(page + 1);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  let prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  const isPrevDisabled = page === 1;
  const isNextDisabled = page >= Math.ceil((Episodes?.length || 0) / pageSize);

  return (
    <View style={tw('gap-2')}>
      <View style={tw('flex-row gap-2 flex-wrap ')}>
        {paginatedData?.map(e => (
          <TouchableOpacity
            key={e.id}
            style={[
              tw(
                'bg-slate-800 p-2  items-center justify-center border border-slate-600',
              ),
              {
                // aspectRatio: 1 / 1,
              },
            ]}>
            <Text key={e.id}>{e.number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={tw('flex-row gap-12 mt-4 justify-center')}>
        <TouchableOpacity
          onPress={prevPage}
          style={[tw('bg-yellow-500 p-2'), isPrevDisabled && tw('opacity-50')]}
          disabled={isPrevDisabled}>
          <FaCaretLeft size={22} fill={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextPage}
          style={[tw('bg-yellow-500 p-2'), isNextDisabled && tw('opacity-50')]}
          disabled={isNextDisabled}>
          <FaCaretRight size={22} fill={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
