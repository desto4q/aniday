import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FaCaretLeft, FaCaretRight} from 'rn-icons/fa';
import {tw} from '../exports/exports';
import {useState} from 'react';

let Navigators = ({
  pid,
  setPid,
  nextPage,
}: {
  pid: number;
  setPid: (e: number) => any;
  nextPage?: boolean;
}) => {
  // let [temp, setTemp] = useState<number>();
  let goFoward = () => {
    if (nextPage) {
      setPid((pid += 1));
      return;
    }
  };

  let goBack = () => {
    if (pid > 1) {
      setPid((pid -= 1));
      return;
    }
  };
  return (
    <View style={tw('flex-row  self-center gap-4 items-center')}>
      <TouchableOpacity
        onPress={goBack}
        style={tw(
          `p-2 bg-yellow-500 rounded-md justify-center items-center ${pid < 2 ? 'bg-opacity-50' : ''}`,
        )}>
        <FaCaretLeft size={22} />
      </TouchableOpacity>
      {/* <TextInput  value=''>

      </TextInput>
       */}

      <TextInput
        style={tw('bg-slate-600 rounded-md px-2 text-center')}
        defaultValue={String(pid)}
        keyboardType="numeric"
        onTextInput={e => {
          let text = e.nativeEvent.text;
        }}
        onSubmitEditing={e => {
          let text = e.nativeEvent.text;
          let digit = Number(text);
          setPid(digit);
        }}></TextInput>
      <TouchableOpacity
        disabled={!nextPage}
        onPress={goFoward}
        style={tw(
          `p-2 bg-yellow-500 rounded-md justify-center items-center ${
            !nextPage ? 'bg-opacity-50' : ''
          }`,
        )}>
        <FaCaretRight size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default Navigators;
