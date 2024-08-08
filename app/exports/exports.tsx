import {style as tw} from 'twrnc';
import {tailwind as colors} from 'easycolors';

import {MMKV} from 'react-native-mmkv';
import {Alert, Modal, TouchableOpacity} from 'react-native';
import {DocumentDirectoryPath, downloadFile} from '@dr.pogodin/react-native-fs';
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
interface IdownloadItem {
  filePath: string;
  url: string;
}

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

let keyGetter = () => {
  let allKeys = fav.getAllKeys();
  return allKeys;
};
let clearer = (keys: string[]) => {
  for (let i of keys) {
  }
};
let deleAll = async (setter?: (item: any) => any) => {
  Alert.alert('are you sure you want to delete all', '', [
    {
      text: 'yes',
      onPress: () => {
        fav.clearAll();
        if (setter) {
          setter([]);
        }
      },
    },
    {
      text: 'no',
      onPress: () => null,
    },
  ]);
};
let fall = require('../../assets/images/offline.jpg');

export {
  tw,
  colors,
  fav,
  checker,
  addtoFav,
  deleteItem,
  deleteSaved,
  fall,
  deleAll,
};
