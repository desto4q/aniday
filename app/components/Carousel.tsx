import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {colors, tw} from '../exports/exports';
import {PaginationProps, SwiperFlatList} from 'react-native-swiper-flatlist';
import {useQuery} from '@tanstack/react-query';
import {fetchPopular, fetchTop} from '../api/api';
import {IAnimeEntry, IAnimePage} from '../exports/interface';
import {LinearGradient} from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {CaroItem} from './CaroItem';

// import {getColors} from 'react-native-image-colors';

let height = Dimensions.get('screen').height;
//note, make the animation and bg effect take place inside the caroitem instead of the slider

export default function CarouselSlider() {
  const {
    data: querydata,
    isLoading,
    isError,
  } = useQuery<IAnimePage>({
    queryKey: ['top', 'home'],
    queryFn: fetchTop.bind(null, {page: 1}),
  });

  return (
    <View style={[tw('w-full relative'), {height: (height * 3) / 4}]}>
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
              id={item.id}
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

let MyPaginator = ({size, scrollToIndex, paginationIndex}: PaginationProps) => {
  // useEffect(() => {
  //   // console.log(paginationIndex, 1);
  // }, [paginationIndex]);

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
