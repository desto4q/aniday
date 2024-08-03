import {style as tw} from 'twrnc';
import {tailwind as colors} from 'easycolors';

import {MMKV} from 'react-native-mmkv';
import {Alert, Modal, TouchableOpacity} from 'react-native';

let fav = new MMKV({id: 'favs'});

let checker = (id: string) => {
  if (fav.getString(id)) {
    return true;
  } else {
    return false;
  }
};

let addtoFav = async ({id, item}: {id: string; item: any}) => {
  fav.set(id, JSON.stringify(item));
  return checker(id);
};

let deleteSaved = (id: string, refresh: () => any) => {
  Alert.alert('Are you sure you want to delete ', id, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Ok',
      onPress: () => {
        fav.delete(id);
        refresh();
      },
      style: 'default',
    },
  ]);
};
let deleteItem = (id: string, set: (item: boolean) => any) => {
  Alert.alert('Are you sure you want to delete ', id, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Ok',
      onPress: () => {
        fav.delete(id);
        set(false);
      },
      style: 'default',
    },
  ]);
};
export {tw, colors, fav, checker, addtoFav, deleteItem, deleteSaved};
