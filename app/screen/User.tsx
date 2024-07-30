import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addtoFav, checker, colors, fav, tw} from '../exports/exports';
import FastImage from 'react-native-fast-image';
import {Image} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {GoCheckCircleFill, GoTag} from 'rn-icons/go';
import {FiRefreshCcw} from 'rn-icons/fi';

import {useNavigation} from '@react-navigation/native';

interface IFavType {
  image: string;
  id: string;
  title: string;
}

let getAll_items = () => {
  let empty: IFavType[] = [];

  let items = fav.getAllKeys();
  for (let i of items) {
    let buffer = fav.getString(i);
    empty.push(JSON.parse(String(buffer)));
  }

  return empty;
};

export default function User() {


  let handleRefresh = () => {
    setFavItems(getAll_items());
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  useEffect(() => {
    handleRefresh()
  }, []);
  let [favItems, setFavItems] = useState<IFavType[]>(getAll_items());
  return (
    <SafeAreaView style={tw('gap-2')}>
      <View style={tw('flex-row items-center gap-2 px-3 h-12')}>
        <Text>Saved</Text>
        <View style={tw('h-full items-center justify-center ml-auto')}>
          <TouchableOpacity
            onPress={() => {
              handleRefresh();
            }}
            style={tw(
              'ml  h-full items-center justify-center px-2 bg-slate-600 rounded-md',
            )}>
            <FiRefreshCcw size={22} fill={colors.yellow[500]} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={tw('px-3')}
        contentContainerStyle={tw('flex-row gap-2 flex-wrap justify-center ')}>
        {favItems.map(({id, image, title}) => {
          return <FavCard id={id} image={image} title={title} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

type FavCardType = {
  id: string;
  image: string;
  title: string;
};

let FavCard = ({id, image, title}: FavCardType) => {
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
    // addtoFav({
    //   id: String(id),
    //   item: item,
    // });
    // setIsFav(checker(String(id))); // Update the favorite status
  };

  return (
    <TouchableOpacity
      onPress={changeScreen}
      style={[tw(' gap-2 w-[46%] relative')]}>
      <FastImage style={tw('w-full h-60 rounded-md')} source={{uri: image}} />
      <Text>{title}</Text>
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
