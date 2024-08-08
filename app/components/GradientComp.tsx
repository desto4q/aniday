import {useEffect, useLayoutEffect, useState} from 'react';
import {LayoutAnimation} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {tw} from '../exports/exports';

let GradientComp = ({bg}: {bg: string}) => {
  let [bgState, setBgState] = useState(bg);

  let configure = () => {
    setBgState(bg);
  };

  let configureNext = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  useEffect(() => {
    configure();
  }, [bg]);

  useLayoutEffect(() => {
    configureNext();
  }, [bgState]);

  return (
    <LinearGradient
      colors={[bgState, 'rgba(0,0,0,0)']}
      start={{x: 0, y: 0}}
      style={tw('h-full w-full absolute')}
    />
  );
};

export {GradientComp};
