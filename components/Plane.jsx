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
import { useContext, useEffect, useState } from 'react';
import { handleAudio } from '../lib/audioObject';
import { router } from 'expo-router';
import { AudioContext } from '../provider/AudioProvider';

export default function Plane() {
  const [fileName, setFileName] = useState(null);

  const { soundFile, setSoundFile, isPlay, setIsPlay, intervalRef } =
    useContext(AudioContext);
  useEffect(() => {
    handleFileName();
  }, [soundFile]);
  const handleFileName = async () => {
    clearInterval(intervalRef.current);
    if (soundFile) {
      setFileName(soundFile.filename);
    }
  };

  const navigate = () => {
    if (fileName) router.navigate(`${isPlay}`);
  };

  const changeSound = async () => {
    await handleAudio.changeSound();
    setIsPlay(true);
    const res = await handleAudio.getSound();
    setSoundFile(res[0]);
  };

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
                {duration(soundFile.duration)}
              </Text>
            </View>
            <View className="flex-row justify-between flex-1">
              <Pressable
                onPress={() => {
                  if (isPlay) {
                    setIsPlay(false);
                    clearInterval(intervalRef.current);
                    handleAudio.pauseAudio();
                  } else {
                    setIsPlay(true);
                    handleAudio.playAudio();
                  }
                }}
              >
                {isPlay ? (
                  <PauseIcon color={'#fff'} size={35} />
                ) : (
                  <PlayIcon size={35} color={'#fff'} />
                )}
              </Pressable>
              <Pressable onPress={changeSound}>
                <RightIcon size={35} />
              </Pressable>
            </View>
          </>
        ) : (
          <Text className="text-white ml-2 h-12 text-center ">
            No se está reproduciendo ninguna música{' '}
          </Text>
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
