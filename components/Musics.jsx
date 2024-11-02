import { Button, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import LogoPro from '../assets/logoSimple.jpeg';
import { duration } from '../lib/duration';
import { useContext } from 'react';
import { handleAudio } from '../lib/audioObject.js';
import { Link } from 'expo-router';
export default function Musics({
  album,
  handleFile
  //handlePosition,
}) {
  //const { handleAudio } = useContext(AudioContext);
  return (
    <Link asChild href={`/${album.id}`}>
      <Pressable
        onPress={() => {
          //handlePosition(0, album.duration);
          handleAudio.createAudioApp(album.uri);
          handleFile(parseInt(album.id));
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
    </Link>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 7
  }
});
