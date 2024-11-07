import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { PlayIcon, PauseIcon, RightIcon } from './Icons';
import LogoPro from '../assets/logoSimple.jpeg';
import { duration } from '../lib/duration';
import { useEffect, useState } from 'react';
import { handleAudio } from '../lib/audioObject';
import { router } from 'expo-router';

export default function Plane() {
  const [fileName, setFileName] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionAudio, setPositionAudio] = useState(0);

  useEffect(() => {
    handleFileName();
  }, [fileName]);

  useEffect(() => {
    handleIsplay();
  }, [isPlaying]);

  const handleIsplay = async () => {
    const res = await handleAudio.getObject();
    if (isPlaying) {
      const currentStatus = await res.getStatusAsync();
      setIsPlaying(currentStatus.isPlaying);
    }
  };

  const handleFileName = async () => {
    const name = await handleAudio.getSound();
    if (name[0]) {
      setFileName(name[0].filename);
      setPositionAudio(parseInt(name[0].duration));
    }
  };

  const navigate = () => {
    if(fileName) router.navigate('/Reproductor');
  };

  console.log(fileName);

  return (
    <TouchableHighlight onPress={navigate}>
      <View className="flex-row z-50 fixed items-center p-2 opacity-80 bg-black ">
            <Image source={LogoPro} style={styles.img} />
        {fileName ? (
          <>
            <View className="w-60 ml-3 flex-shrink">
              <Text className="text-white max-h-8 mr-5">
                {fileName && fileName}
              </Text>
              <Text className="text-yellow-400">
                {duration(positionAudio)}
              </Text>
            </View>
            <View className="flex-row justify-between flex-1">
              <Pressable
                onPress={() => {
                  if (isPlaying) {
                    setIsPlaying(false);
                    handleAudio.playAudio();
                  } else {
                    setIsPlaying(true);
                    handleAudio.pauseAudio();
                  }
                }}
              >
                {!isPlaying ? (
                  <PauseIcon color={'#fff'} size={35} />
                ) : (
                  <PlayIcon size={35} color={'#fff'} />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  handleAudio.changeSound();
                }}
              >
                <RightIcon size={35} />
              </Pressable>
            </View>
          </>
        ) : (
          <Text className="text-white ml-2 h-12 text-center ">No se está reproduciendo ninguna música </Text>
        )}
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 45,
    height: 45,
    borderRadius: 7
  }
});
