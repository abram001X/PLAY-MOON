import { Button, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import LogoPro from '../assets/logoSimple.jpeg';
import { duration } from '../lib/duration';
import { useSound } from '../lib/zustand';
import { createAudioApp } from '../lib/playAudio';

export default function Musics({ album, navigation }) {
  const { file, addSound, assets, addAudioAssets } = useSound();
  return (
    <Pressable
      onPress={() => {
        //handlePosition(0,album.duration);
        createAudioApp(album.uri).then((file) => {
          addSound(file);
          addAudioAssets({
            ...assets,
            id: parseInt(album.id),
            uri: album.uri,
            duration: album.duration,
            position: 0,
            filename: album.filename,
            isPlaying: false
          });
        });
        //handleFile(parseInt(album.id));*/
        navigation.navigate('Reproductor', {
          filename: album.filename,
          id: album.id,
          durationAudio: album.duration
        });
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
