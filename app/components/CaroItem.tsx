import LinearGradient from 'react-native-linear-gradient';
import {colors, tw} from '../exports/exports';
import {GoPlay} from 'rn-icons/go';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useEffect, useState} from 'react';
import {getPalette} from 'react-native-palette-picker';
import {useNavigation} from '@react-navigation/native';
import {IAnimeEntry} from '../exports/interface';
let width = Dimensions.get('window').width;
interface ICaroItem extends IAnimeEntry {}
const CaroItem = ({title, image, releaseDate, id}: ICaroItem) => {
  let navigation = useNavigation<any>();

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
              navigation.navigate('Info', {
                id: id,
              });
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

export {CaroItem};
