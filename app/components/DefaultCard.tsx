import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {IAnimeEntry} from '../exports/interface';
import {
  addtoFav,
  checker,
  colors,
  deleteItem,
  fav,
  tw,
} from '../exports/exports';
import {GoCheckCircleFill, GoTag} from 'rn-icons/go';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

let DefaultCard = ({image, title, id}: IAnimeEntry) => {
  let item = {
    image,
    title,
    id,
  };
  let navigation: any = useNavigation();
  let [isFav, setIsFav] = useState(checker(String(id)));

  let changeScreen = () => {
    navigation.navigate('Info', {
      id: id,
    });
  };

  let handleAddToFav = () => {
    if (checker(String(id))) {
      deleteItem(String(id), setIsFav);
    } else {
      addtoFav({
        id: String(id),
        item: item,
      });
      setIsFav(true);
    }
    // if (checker(String(id))) {
    //   deleteItem(String(id));
    //   console.log(checker(String(id)));
    //   // setIsFav(checker(String(id)));
    //   return;
    // }
    // addtoFav({
    //   id: String(id),
    //   item: item,
    // });
    // setIsFav(checker(String(id))); // Update the favorite status
  };

  return (
    <TouchableOpacity
      onPress={changeScreen}
      style={[
        tw('rounded-md gap-1 relative'),
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
        onPress={handleAddToFav}
        style={tw(
          'absolute z-20 top-0 bg-yellow-600 p-2 right-0 m-1 rounded-sm',
        )}>
        {!isFav ? <GoTag /> : <GoCheckCircleFill />}
      </TouchableOpacity>
      <LinearGradient
        colors={[`${colors.neutral[900]}b3`, 'rgba(0,0,0,0)']}
        renderToHardwareTextureAndroid
        style={tw('h-60 w-full absolute')}
      />
    </TouchableOpacity>
  );
};

export default DefaultCard;
