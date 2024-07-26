import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {colors, tw} from '../exports/exports';
import {PaginationProps, SwiperFlatList} from 'react-native-swiper-flatlist';
import {useQuery} from '@tanstack/react-query';
import {fetchPopular, fetchTop} from '../api/api';
import {IAnimeEntry, IAnimePage} from '../exports/interface';
import {GoDotFill, GoPlay} from 'rn-icons/go';
import {LinearGradient} from 'react-native-linear-gradient';
let width = Dimensions.get('window').width;
let height = Dimensions.get('screen').height;
export default function CarouselSlider() {
  const {
    data: querydata,
    isLoading,
    isError,
  } = useQuery<IAnimePage>({
    queryKey: ['top', 'home'],
    queryFn: fetchTop.bind(null, {page: 1}),
  });

  useEffect(() => {
    console.log((height * 3) / 4);
  }, []);
  // useEffect(()=>{
  //   console.log(querydata?.results.slice(0,2))
  // },[querydata])
  // const renderItems = isError
  //   ? Array(10)
  //       .fill(null)
  //       .map((_, index) => (
  //         <View key={index}>
  //           <Text>fetch failed</Text>
  //         </View>
  //       ))
  //   : (querydata?.results || Array(10).fill(null)).map((item, index) => (
  //       <View key={index}>
  //         <Text>{querydata ? 'thanks' : 'fetch failed'}</Text>
  //       </View>
  //     ));

  return (
    <View style={[tw('w-full'), {height: (height * 3) / 4}]}>
      {isError ? (
        <>
          <Text>Error</Text>
        </>
      ) : isLoading ? (
        <>
          <Text>Loading</Text>
        </>
      ) : (
        <SwiperFlatList
          // autoplay
          // autoplayDelay={2}
          // autoplayLoop
          index={0}
          PaginationComponent={({scrollToIndex, size, paginationIndex}) => {
            return (
              <MyPaginator
                size={size}
                paginationIndex={paginationIndex}
                scrollToIndex={scrollToIndex}
              />
            );
          }}
          showPagination
          data={querydata?.results.slice(0, 10)}
          renderItem={({item, index}: {item: IAnimeEntry; index: number}) => (
            <CaroItem
              key={index}
              title={item.title}
              releaseDate={item.releaseDate}
              image={item.image}
            />
          )}
        />
      )}
    </View>
  );
}
const CaroItem = React.memo(
  ({title, image, releaseDate}: IAnimeEntry) => {
    // console.log(releaseDate)
    return (
      <View style={[tw('p-3 relative rounded-lg'), {width}]}>
        <Image source={{uri: image}} style={tw('w-full h-full rounded-lg')} />
        <View style={tw('absolute ml-4 bottom-5 z-20 gap-1')}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[tw('font-bold  text-2xl'), {}]}>
            {title}
          </Text>

          <View style={tw('flex-row items-center gap-2')}>
            <TouchableOpacity
              style={tw(
                'flex-row items-center gap-2 p-2 px-4 rounded-md bg-emerald-600 self-start',
              )}>
              <GoPlay size={18} fill={colors.neutral[900]} />
              <Text style={tw('text-black text-sm font-bold')}>Play</Text>
            </TouchableOpacity>
            <Text
              style={[
                tw('font-semibold'),
                {
                  fontSize: 16,
                },
              ]}>
              {releaseDate}
            </Text>
          </View>
        </View>
        <LinearGradient
          colors={['transparent', 'black']}
          angle={90}
          style={tw('h-full w-full absolute z-10 m-3 rounded-lg')}
        />
      </View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.title === nextProps.title && prevProps.image === nextProps.image,
);

let MyPaginator = ({size, scrollToIndex, paginationIndex}: PaginationProps) => {
  useEffect(() => {
    console.log(paginationIndex, 1);
  }, [paginationIndex]);

  let temp = useMemo(() => {
    return Array.from({length: size});
  }, [size]);

  return (
    <View style={[tw('h-12 w-full ')]}>
      <View style={tw('h-12 w-full relative')}>
        <View style={tw('flex-row  justify-evenly my-auto')}>
          {temp.map((e, index) => {
            return (
              <CustomPointer
                key={index}
                activeIndex={Number(paginationIndex)}
                index={index}
                scrollToIndex={scrollToIndex}
              />
            );
          })}
        </View>
        <LinearGradient
          pointerEvents="none"
          colors={['black', 'rgba(0,0,0,0)', 'black']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={tw('h-full w-full absolute')}
        />
      </View>
    </View>
  );
};

const CustomPointer = ({
  index,
  activeIndex,
  scrollToIndex,
}: {
  index: number;
  activeIndex: number;
  scrollToIndex: ({index}: {index: number}) => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0.2)).current;
  let [fadeState, setFadeState] = useState<boolean>(false);
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  let watcher = () => {
    if (activeIndex == index) {
      if (fadeState == true) {
        return;
      }
      fadeIn();
      setFadeState(true);
      return;
    } else if (activeIndex != index) {
      if (fadeState == false) {
        return;
      }
      fadeOut();
      setFadeState(false);
      return;
    }
  };
  let changer = () => {
    scrollToIndex({index: index});
  };
  useEffect(() => {
    watcher();
  }, [activeIndex]);
  return (
    <TouchableOpacity
      style={tw('p-1')}
      onPress={() => {
        changer();
      }}>
      <Animated.View
        style={[
          tw('h-4 w-4 bg-white rounded-md '),
          {opacity: fadeAnim},
        ]}></Animated.View>
    </TouchableOpacity>
  );
};
