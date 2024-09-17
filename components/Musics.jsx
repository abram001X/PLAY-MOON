import { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import LogoPro from '../assets/logoSimple.jpeg';
import { Link } from 'expo-router';
import { playAudio } from '../lib/playAudio';

export default function Musics({ album }) {
  const [sound, setSound] = useState(null);
  /*useEffect(() => {
    playAudio(album.uri)
  }, []);*/

  const playSound = async () => {
    await sound.playAsync();
  };

  return (
    <Link asChild href={`/${album.id}`}>
      <Pressable>
        <View key={album.id} className="flex-row  p-2 pl-0">
          <Image source={LogoPro} style={styles.img} />
          <Text className="text-white ml-2">{album.filename}</Text>
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
