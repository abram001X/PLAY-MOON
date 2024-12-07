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
import { useContext, useEffect, useRef, useState } from 'react';
import { handleAudio } from '../lib/audioObject';
import { router } from 'expo-router';
import { AudioContext } from '../provider/AudioProvider';

export default function Plane() {
  const [fileName, setFileName] = useState(null);
  const intervalRef = useRef(null);
  const { sound, setSound, isPlay, setIsPlay, setPosition, position } =
    useContext(AudioContext);

  useEffect(() => {
    handleFileName();
  }, [sound]);

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(async () => {
        const seconds = await handleAudio.rangeProccess();
        setPosition(seconds);
        if (sound && seconds + 1 >= sound.duration) {
          changeSound();
        }
      }, 1000);

      intervalRef.current = interval;
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPlay]);

  const handleFileName = async () => {
    if (sound) {
      setFileName(sound.filename);
      const res2 = await handleAudio.rangeProccess();
      setPosition(res2);
    }
  };

  const navigate = () => {
    if (fileName) router.navigate(`/reproductor/${isPlay}`);
  };

  const changeSound = async () => {
    clearInterval(intervalRef.current);
    setIsPlay(false);
    await handleAudio.changeSound();
    const res = await handleAudio.getSound();
    setSound(res[0]);
    setIsPlay(true);
  };

  return (
    <TouchableHighlight onPress={navigate}>
      <View className="flex-row z-30 fixed items-center p-2 opacity-80 bg-black ">
        <Image source={LogoPro} style={styles.img} />
        {fileName ? (
          <>
            <View className="w-60 ml-3 flex-shrink">
              <Text className="text-white max-h-8 mr-5">
                {fileName && fileName}
              </Text>
              <Text className="text-yellow-400">
                {duration(parseInt(position))}
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
