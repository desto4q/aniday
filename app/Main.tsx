import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Rtab from './navigation/Rtab';
import Rstack from './navigation/Rstack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {fav} from './exports/exports';
let client = new QueryClient();
export default function Main() {
  let checker = () => {
    if (fav.contains('home')) {
      
      fav.delete("home")
      return
    } else {
      return
      // fav.set('home', 'love');
    }
    return;
  };
  useEffect(() => {
    checker();
  }, []);

  return (
    <>
      <QueryClientProvider client={client}>
        <Rstack />
      </QueryClientProvider>
    </>
  );
}
