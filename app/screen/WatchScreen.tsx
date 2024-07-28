import {View, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {fetchEpisode} from '../api/api';
import {colors, tw} from '../exports/exports';
import {FaCaretLeft, FaCaretSquareLeft} from 'rn-icons/fa';
import Video, {VideoRef} from 'react-native-video';
import {IEpisode} from '../exports/interface';
import {SafeAreaView} from 'react-native-safe-area-context';

type sources = {
  url: string;
  isM3U8: boolean;
  quality: '360p' | '480p' | '720p' | '1080p' | 'default' | 'backup';
};

interface MediaInfo {
  headers: {
    Referer: string;
  };
  sources: sources[];
  download: string;
}

export default function WatchScreen({route}: any) {
  let {episodeId, AnimeId}: {episodeId: string; AnimeId: string} = route.params;
  let falseId = episodeId.replace(/-episode[- ]?\d*/i, '');

  let {
    data: episode,
    isLoading,
    isError,
  } = useQuery<MediaInfo>({
    queryKey: ['watch', episodeId, AnimeId || falseId],
    queryFn: async () => await fetchEpisode({id: episodeId}),
  });
  const videoRef = useRef<VideoRef>(null);
  return (
    <SafeAreaView style={tw('')}>
      <View style={tw('px-3')}>
        <View style={tw('flex-row gap-2 items-center')}>
          <TouchableOpacity
            style={tw('h-12 px-2 items-center justify-center self-start')}>
            <FaCaretLeft size={22} fill={colors.yellow[500]} />
          </TouchableOpacity>
          <Text style={tw('capitalize text-xl')}>
            {AnimeId.replaceAll('-', ' ') || falseId.replaceAll('-', ' ')}
          </Text>
        </View>
      </View>

      <View style={tw(' min-h-84 ')}>
        {isError ? (
          <></>
        ) : isLoading ? (
          <></>
        ) : episode ? (
          <VideoComp links={episode?.sources} />
        ) : null}
      </View>
      <View style={tw('px-3')}>
        <Text style={tw('text-lg')}>
          {episodeId.replace(AnimeId + '-' || falseId + '-', '')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const VideoComp = ({links}: {links: sources[]}) => {
  let [uri, setUri] = useState<string>(links[0].url);
  let setter = (i: string) => {
    setUri(i);
    configure();
  };
  let configure = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);
  return (
    <View style={tw('gap-3 py-2  ')}>
      <Video
        style={tw('h-84  bg-slate-800')}
        source={{uri: uri}}
        controls
        paused
        onSeek={e => {
          console.log(e);
        }}
      />
      <View style={tw('flex-row gap-2 h-9 px-3')}>
        {links.slice(0, 4).map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setUri(e.url);
              }}
              key={e.quality}
              style={tw(
                'h-full  bg-slate-600 p-2 rounded-md items-center justify-center',
              )}>
              <Text>{e.quality}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
