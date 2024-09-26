import { Button, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import LogoPro from '../assets/logoSimple.jpeg';
import { duration } from '../lib/duration';
export default function Musics({ album, handleFile, createAudio }) {
  return (
    <Pressable
      onPress={() => {
        createAudio(album.uri, album.filename);
        handleFile(album.id);
      }}
    >
      <View key={album.id} className="flex-row  p-2 pl-0">
        <Image source={LogoPro} style={styles.img} />
        <View className="flex-shrink">
          <Text className="text-white ml-2 h-4">{album.filename}</Text>
          <Text className="text-slate-200 ml-2 mt-3">
            {duration(album.duration)}{' '}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 7
  }
});
