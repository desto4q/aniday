import {View, Text} from 'react-native';
import React from 'react';
import Rtab from './navigation/Rtab';
import Rstack from './navigation/Rstack';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
let client = new QueryClient()
export default function Main() {
  
  return<>
  <QueryClientProvider client={client}>
  <Rstack/>
  </QueryClientProvider>
  </>;
}
