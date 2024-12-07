import {
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image
} from 'react-native';
import { MenuIconVertical } from './Icons';
import LogoPro from '../assets/logoSimple.jpeg';
export default function PlayListComp({ playLists, isComp }) {
  return (
    <>
      <View className="flex-row  p-2 pl-0">
        <Image source={LogoPro} style={styles.img} />
        <View className="flex-shrink w-full">
          <Text className="text-white ml-2 h-4 text-sm">{playLists.name}</Text>
          <Text className="text-slate-300 ml-2 mt-3">
            {' '}
            Músicas : {playLists.musicsCount}
          </Text>
        </View>
        {isComp ? (
          <View className="justify-center">
            <TouchableHighlight
              className="rounded-full"
              activeOpacity={0.6}
              underlayColor="#aaa"
            >
              <View>
                <MenuIconVertical size={19} className="p-1" />
              </View>
            </TouchableHighlight>
          </View>
        ) : null}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 7
  }
});
