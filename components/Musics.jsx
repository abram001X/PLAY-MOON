import { Button, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import LogoPro from '../assets/logoSimple.jpeg';
import { duration } from '../lib/duration';
import { Link } from 'expo-router';
import { useSound } from '../lib/zustand';
import { useContext } from 'react';
import { AudioContext } from '../provider/AudioProvider';
export default function Musics({
  album
  //handlePosition,
}) {
  const { setAudioId, handleAudio } = useContext(AudioContext);
  const create = async () => {
    setAudioId(parseInt(album.id));
    await handleAudio.createAudioApp(album.uri);
  };
  return (
    <Link asChild href={`/Reproductor`}>
      <Pressable onPress={create}>
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
