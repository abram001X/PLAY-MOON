import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PlayIcon, PauseIcon, RightIcon } from './Icons';
import LogoPro from '../assets/logoSimple.jpeg';
import { pauseAudio, playAudio } from '../lib/playAudio';
export function Plane({
  fileAudio,
  isPlaying,
  status,
  fileName,
  albumSound,
  fileId,
  changeSound
}) {
  return (
    <View className="flex-row z-50 fixed items-center p-2 opacity-80 bg-black">
      <Image source={LogoPro} style={styles.img} />
      <View className="w-60 ml-3 flex-shrink">
        <Text className="text-white max-h-8 mr-5">{fileName && fileName}</Text>
      </View>
      <View className="flex-row justify-between flex-1">
        <Pressable
          onPress={() => {
            if (status) {
              isPlaying(false);
              playAudio(fileAudio);
            } else {
              isPlaying(true);
              pauseAudio(fileAudio);
            }
          }}
        >
          {!status ? (
            <PauseIcon color={'#fff'} size={35} />
          ) : (
            <PlayIcon size={35} color={'#fff'} />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            changeSound(fileId, albumSound);
          }}
        >
          <RightIcon size={35} />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    borderRadius: 7
  }
});
