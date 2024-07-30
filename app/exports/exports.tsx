import {style as tw} from 'twrnc';
import {tailwind as colors} from 'easycolors';

import {MMKV} from 'react-native-mmkv';

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
export {tw, colors, fav, checker, addtoFav};
