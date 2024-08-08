import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Rtab from './navigation/Rtab';
import Rstack from './navigation/Rstack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {fav} from './exports/exports';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

let client = new QueryClient();

let checker = () => {
  if (fav.contains('home')) {
    fav.delete('home');
    return;
  } else {
    return;
  }
};

const requestPermissions = async () => {
  // console.log('yes');
  try {
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      // console.log('Read permission granted');
    } else {
      Alert.alert(
        'Permission Denied',
        'Read permission is required to access files.',
      );
    }

    const writeResult = await request(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    if (writeResult === RESULTS.GRANTED) {
      // console.log('Write permission granted');
    } else {
      Alert.alert(
        'Permission Denied',
        'Write permission is required to save files.',
      );
    }
  } catch (error) {
    console.error('Permission request error:', error);
  }
};

export default function Main() {
  useEffect(() => {
    checker();
    requestPermissions();
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <Rstack />
      </QueryClientProvider>
    </>
  );
}
