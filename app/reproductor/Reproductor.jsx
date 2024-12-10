import { StyleSheet, ImageBackground } from 'react-native';

import { useContext, useEffect, useRef, useState } from 'react';
import { duration } from '../../lib/duration.js';
import { handleAudio } from '../../lib/audioObject.js';
import { AudioContext } from '../../provider/AudioProvider.jsx';
import Sound from '../../components/Sound.jsx';
import { useNavigation } from '@react-navigation/native';

export default function Reproductor({ route }) {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(null);
  const intervalRef = useRef(null);
  const { sound, setSound, setIsPlay, setIsRandom, position, setPosition } =
    useContext(AudioContext);
  const { istrue } = route.params;

  useEffect(() => {
    handleSound(istrue);
  }, []);

  const handlePosition = async (value) => {
    await handleAudio.handlePosition(value[0] * 1000);
    setPosition(value[0]);
  };

  const handleSound = async (play = true) => {
    clearInterval(intervalRef.current);
    const res = await handleAudio.getSound();
    const res2 = await handleAudio.rangeProccess();
    setSound(res[0]);
    setSeconds(duration(res[0].duration));
    setPosition(res2);
    if (play) setIsPlay(true);
    else setIsPlay(false);
  };

  const randomList = async () => {
    const res = await handleAudio.handleListRandom();
    setIsRandom(res);
  };

  const pauseSound = () => {
    clearInterval(intervalRef.current);
    handleAudio.pauseAudio();
    setIsPlay(false);
  };

  const playSound = () => {
    handleAudio.playAudio();
    setIsPlay(true);
  };

  const backAudio = async () => {
    handleAudio.pauseAudio();
    setIsPlay(false);
    await handleAudio.backSound();
    await handleSound(true);
    setPosition(0);
  };

  const changeAudio = async () => {
    handleAudio.pauseAudio();
    setIsPlay(false);
    await handleAudio.changeSound();
    await handleSound(true);
    setIsPlay(true);
    setPosition(0);
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo.jpeg')}
      style={styles.imgBack}
    >
      <Sound
        seconds={seconds}
        position={position}
        asset={sound}
        randomList={randomList}
        handlePosition={handlePosition}
        pauseSound={pauseSound}
        playSound={playSound}
        backAudio={backAudio}
        changeAudio={changeAudio}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
    ResizeMode: 'cover'
  }
});
