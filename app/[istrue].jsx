import LogoPro from '../assets/logoSimple.jpeg';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  Pressable,
  BackHandler
} from 'react-native';
import {
  LeftIcon,
  PlayIcon,
  RandomIcon,
  RepeatIcon,
  RightIcon,
  PauseIcon
} from '../components/Icons.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Slider } from '@miblanchard/react-native-slider';
import { duration } from '../lib/duration.js';
import { handleAudio } from '../lib/audioObject.js';
import { AudioContext } from '../provider/AudioProvider.jsx';
import { router, useLocalSearchParams } from 'expo-router';
export default function Reproductor() {
  const [seconds, setSeconds] = useState(null);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [isRandom, setIsRandom] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const { setSoundFile, intervalRef } = useContext(AudioContext);
  const { istrue } = useLocalSearchParams();
  useEffect(() => {
    console.log(isPlay, 'isplay');
    if (isPlay) {
      const interval = setInterval(async () => {
        const seconds = await handleAudio.rangeProccess();
        console.log(seconds);
        setPosition(seconds);
        if (sound && seconds + 1 >= sound.duration) {
          changeAudio();
        }
      }, 700);

      intervalRef.current = interval;
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPlay]);

  useEffect(() => {
    handleSound();
  }, []);

  const handlePosition = async (value) => {
    await handleAudio.handlePosition(value[0] * 1000);
    setPosition(value[0]);
  };

  const handleSound = async () => {
    clearInterval(intervalRef.current);
    if (istrue == 'true') setIsPlay(true);
    else setIsPlay(false);
    const res = await handleAudio.getSound();
    const res2 = await handleAudio.rangeProccess();
    console.log(istrue, 'istrue');
    setSound(res[0]);
    setSoundFile(res[0]);
    setSeconds(duration(res[0].duration));
    setPosition(res2);
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
    pauseSound();
    await handleAudio.backSound();
    await handleSound();
    setPosition(0);
    setIsPlay(true);
  };

  const changeAudio = async () => {
    pauseSound();
    await handleAudio.changeSound();
    await handleSound();
    setPosition(0);
    setIsPlay(true);
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      style={styles.imgBack}
    >
      {sound && (
        <View style={styles.contSound}>
          <View style={styles.contImg}>
            <Image source={LogoPro} style={styles.img} />
          </View>
          <View style={styles.contInterfaz}>
            <View style={styles.contText}>
              <Text style={styles.textTitle} className="h-11 ">
                {sound.filename}
              </Text>
            </View>
            <View style={styles.slider}>
              <Slider
                minimumTrackTintColor="#18f"
                maximumTrackTintColor="#fff"
                minimumValue={0}
                maximumValue={sound.duration}
                value={position}
                onValueChange={handlePosition}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ color: '#fff' }}>
                  {duration(parseInt(position))}{' '}
                </Text>
                <Text style={styles.duration}>{seconds && seconds} </Text>
              </View>
            </View>

            <View style={styles.contPlay}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#222"
                style={
                  isRandom && {
                    backgroundColor: '#222',
                    padding: 5,
                    borderRadius: 50
                  }
                }
                onPress={randomList}
              >
                <RandomIcon />
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="#222"
                style={styles.icons}
                onPress={backAudio}
              >
                <LeftIcon />
              </TouchableHighlight>
              <Pressable
                onPress={() => {
                  if (isPlay) {
                    return pauseSound();
                  }
                  playSound();
                }}
              >
                {isPlay ? <PauseIcon /> : <PlayIcon />}
              </Pressable>
              <TouchableHighlight
                activeOpacity={0.7}
                underlayColor="#222"
                style={styles.icons}
                onPress={changeAudio}
              >
                <RightIcon />
              </TouchableHighlight>
              <RepeatIcon />
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contSound: {
    flex: 1
  },
  contImg: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  contInterfaz: {
    padding: 10,
    flex: 1
  },
  img: {
    width: 350,
    height: 400,
    borderRadius: 25
  },
  contPlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  slider: {
    marginBottom: 30
  },
  text: {
    color: '#fff'
  },
  contText: {
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textTitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: 17,
    textAlign: 'left',
    marginLeft: 10,
    marginBottom: 15,
    width: 230
  },
  duration: {
    color: '#fff'
  },
  imgBack: {
    flex: 1,
    ResizeMode: 'cover'
  },
  icons: {
    borderRadius: 50,
    padding: 5
  }
});
