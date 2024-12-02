import { ImageBackground, StyleSheet, TouchableHighlight, View } from 'react-native';
import { MenuIconVertical } from './Icons';
export default function PlayListComp({ playLists }) {
  return (
    <>
      <View key={album.id} className="flex-row  p-2 pl-0">
        <Image source={LogoPro} style={styles.img} />
        <View className="flex-shrink w-full">
          <Text className="text-white ml-2 h-4"></Text>
          <Text className="text-slate-200 ml-2 mt-3"></Text>
        </View>
        <View className="justify-center">
          <TouchableHighlight
            className="rounded-full"
            activeOpacity={0.6}
            underlayColor="#aaa"
          >
            <MenuIconVertical size={19} className="p-1" />
          </TouchableHighlight>
        </View>
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
  