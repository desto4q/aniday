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
import {GoDotFill, GoPlay} from 'rn-icons/go';
import {LinearGradient} from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {getPalette, type ImageColorsResult} from 'react-native-palette-picker';

// import {getColors} from 'react-native-image-colors';
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
  let [bg, setbg] = useState(colors.slate[600]);
  let [activeIndex, setActiveIndex] = useState(0);
  let configure = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);
  useEffect(() => {
    configure();
  }, [bg]);
  return (
    <View style={[tw('w-full relative'), {height: (height * 3) / 4}]}>
      <LinearGradient
        colors={[bg, 'rgba(0,0,0,0)']}
        start={{x: 0, y: 0}}
        style={tw('h-full w-full absolute  ')}
      />
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
          // autoplayDelay={7}
          // autoplayLoop
          index={activeIndex}
          onChangeIndex={({index}) => {
            setActiveIndex(prev => index);
            // console.log('active', activeIndex);
            // console.log(index)
          }}
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
              setNewBg={setbg}
              activeIndex={activeIndex}
              index={index}
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









interface ICaroItem extends IAnimeEntry {
  activeIndex: number;
  index: number;
  setNewBg: (bg: string) => any;
}
const CaroItem = ({
  title,
  image,
  releaseDate,
  id,
  activeIndex,
  index,
  setNewBg,
}: ICaroItem) => {
  let navigation = useNavigation<any>();
  let [caroBg, setBg] = useState('rgba(0,0,0,0)');

  let checker = () => {
    if (activeIndex == index) {
      console.log(caroBg);

      if (caroBg != 'rgba(0,0,0,0)') {
        setNewBg(caroBg);
      } else {
        setNewBg(colors.slate[600]);
      }
    }
    return;
  };
  let fetchColor = async (url: string) => {
    try {
      await getPalette(url).then(res => {
        setBg(res.dominant);
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  useEffect(() => {
    checker();
  }, [activeIndex]);

  useEffect(() => {
    fetchColor(String(image));
  }, []);
  return (
    <View style={[tw('p-3 relative rounded-lg'), {width}]}>
      <FastImage source={{uri: image}} style={tw('w-full h-full rounded-lg')} />
      <View style={tw('absolute ml-4 bottom-5 z-20 gap-1')}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[tw('font-bold  text-2xl'), {}]}>
          {title}
        </Text>

        <View style={tw('flex-row items-center gap-2')}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Info', {
              //   id: id,
              // });
              console.log(activeIndex, index);
            }}
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
};

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
