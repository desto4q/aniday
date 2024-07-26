import {Image, Text, TouchableOpacity} from 'react-native';
import {IAnimeEntry} from '../exports/interface';
import {colors, tw} from '../exports/exports';
import {GoTag} from 'rn-icons/go';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

let DefaultCard = ({image, title, id}: IAnimeEntry) => {
  let navigation: any = useNavigation();
  let changeScreen = () => {
    navigation.navigate('Info', {
      id: id,
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        changeScreen();
      }}
      style={[
        tw('   rounded-md gap-1 relative'),
        {
          width: 240 * (4 / 6),
        },
      ]}>
      <Image
        source={{uri: image}}
        style={[tw('h-60 w-full rounded-md'), {aspectRatio: 4 / 6}]}
      />
      <Text numberOfLines={2}>{title}</Text>
      <TouchableOpacity
        style={tw(
          'absolute z-20 top-0 bg-yellow-600 p-2 right-0 m-1 rounded-sm',
        )}>
        <GoTag />
      </TouchableOpacity>
      <LinearGradient
        colors={[`${colors.neutral[900]}b3`, 'rgba(0,0,0,0)']}
        renderToHardwareTextureAndroid
        style={tw('h-60 w-full absolute')}></LinearGradient>
    </TouchableOpacity>
  );
};

export default DefaultCard;
