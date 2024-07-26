import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Test from '../screen/Test';
import {colors, tw} from '../exports/exports';

import { GoFileDirectory, GoHeart, GoHome,  GoSearch} from "rn-icons/go"
import Gallery from '../screen/Gallery';
import User from '../screen/User';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
export default function Rtab() {
  let Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator screenOptions={{
      headerShown:false
    }} tabBar={props => <CustomTab {...props} />}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Test} />
      <Tabs.Screen name="Gallery" component={Gallery} />
      <Tabs.Screen name="User" component={User} />
    </Tabs.Navigator>
  );
}

let CustomTab = (props: BottomTabBarProps) => {
  let {routes, index: currentIndex} = props.state;
  return (
    <View 
      style={tw(
        'bg-gray-950 h-15  absolute bottom-0 w-full flex-row justify-evenly',
      )}>
      {/* <Text>{String(props.navigation.isFocused())}</Text> */}
      {routes.map((e, i) => {
        let onpress = () => {
          // console.log(e.params);
          props.navigation.navigate(e.name);
        };

        return (
          <TabPill
            index={i}
            key={e.key}
            name={String(e.name)}
            onpress={onpress}
            focused={currentIndex === i}
          />
        );
      })}
    </View>
  );
};
let icon_size = 22 ;
let Icons = [
  (color: string) => <GoHome size={icon_size} fill={color} />,
  (color: string) => <GoSearch size={icon_size} fill={color} />,
  (color: string) => <GoHeart size={icon_size} fill={color} />,
  (color: string) => <GoFileDirectory size={icon_size} fill={color} />,
];

let TabPill = ({
  focused,
  name,
  onpress,
  index,
}: {
  focused?: boolean;
  name: string;
  onpress: () => void;
  index: number;
}) => {
  let [isFocused, setISFocused] = useState(focused);
  let setter = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setISFocused(focused);
  };
  useEffect(() => {
    setter();
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onpress}
      style={tw('h-full flex-row items-center gap-2 justify-center px-2')}>
      {/* <Text>{name}</Text> */}
      <View
        style={tw(
          'self-center items-center bg-opacity-20 flex-row gap-2  p-2 rounded-lg px-3',
          focused ? 'bg-yellow-500' : '',
        )}>
        {Icons[index](isFocused ? colors.yellow[300] : colors.neutral[700])}

        {isFocused ? (
          <Text style={tw('text-yellow-300 ')}>{name}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
