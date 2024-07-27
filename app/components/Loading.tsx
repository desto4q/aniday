import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, tw} from '../exports/exports';

let Loading = () => {
  return (
    <View style={tw('w-full h-96 justify-center items-center')}>
      <ActivityIndicator size={32} color={colors.yellow[500]} />
    </View>
  );
};

let screenHeight = Dimensions.get('screen').height;
let ErrorComp = ({refetch}: {refetch: () => any}) => {
  return (
    <View
      style={[
        tw('w-full  justify-center items-center'),
        {
          height: screenHeight * (9 / 10),
        },
      ]}>
      <TouchableOpacity
        onPress={refetch}
        style={tw('p-2 px-3 bg-yellow-500 rounded-md')}>
        <Text style={tw('text-xl text-black')}>reftech</Text>
      </TouchableOpacity>
    </View>
  );
};
export {Loading, ErrorComp};
