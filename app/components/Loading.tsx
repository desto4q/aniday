import {
  ActivityIndicator,
  Dimensions,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, tw} from '../exports/exports';
import {FaCaretLeft, FaCaretRight} from 'rn-icons/fa';
import {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {IEpisode} from '../exports/interface';

let Loading = () => {
  return (
    <View style={tw('w-full h-96 justify-center items-center')}>
      <ActivityIndicator size={32} color={colors.yellow[500]} />
    </View>
  );
};

let screenHeight = Dimensions.get('screen').height;
let ErrorComp = ({refetch}: {refetch: () => any}) => {
  return (
    <View
      style={[
        tw('w-full  justify-center items-center'),
        {
          height: screenHeight * (9 / 10),
        },
      ]}>
      <TouchableOpacity
        onPress={refetch}
        style={tw('p-2 px-3 bg-yellow-500 rounded-md')}>
        <Text style={tw('text-xl text-black')}>reftech</Text>
      </TouchableOpacity>
    </View>
  );
};

let EpisodePaginator = ({
  Episodes,
  AnimeId,
}: {
  Episodes?: IEpisode[];
  AnimeId: string;
}) => {
  let [page, setPage] = useState<number>(1);
  const pageSize = 50;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const reversedEpisodes = [...(Episodes || [])].reverse();
  const paginatedData = reversedEpisodes.slice(startIndex, endIndex);

  let navigation: any = useNavigation();
  let myNav = useMemo(
    () => (episodeId: string, AnimeId: string) => {
      navigation.navigate('Watch', {
        episodeId: episodeId,
        AnimeId: AnimeId,
      });
    },
    [],
  );

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
            onPress={() => {
              myNav(e.id, AnimeId);
            }}
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

export {Loading, ErrorComp,EpisodePaginator};
