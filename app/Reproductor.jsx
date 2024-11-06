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
import { useEffect, useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Slider } from '@miblanchard/react-native-slider';
import { duration } from '../lib/duration.js';
import { handleAudio } from '../lib/audioObject.js';
export default function Reproductor() {
  const [seconds, setSeconds] = useState(null);
  const [status, setStatus] = useState(true);
  const [isPlaying, setIsplaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef(null);
  const [randomMode, setRandomModesound] = useState(false);

  useEffect(() => {
    handleSound();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      console.log('hey');
      const interval = setInterval(async () => {
        console.log('hola');
        const seconds = await handleAudio.rangeProccess();
        console.log(seconds);
        setPosition(seconds);
      }, 900);
      intervalRef.current = interval;
    } else clearInterval(intervalRef.current);
  }, [isPlaying]);

  const proccessAudio = async () => {};

  const handlePosition = async (value) => {
    //value[0]
    await handleAudio.handlePosition(value[0] * 1000);
    setPosition(value[0]);
  };

  const handleSound = async () => {
    const res = await handleAudio.getSound();
    setSeconds(duration(res[0].duration));
    setSound(res[0]);
    setIsplaying(true);
    clearInterval(intervalRef.current);
  };

  const randomList = async () => {
    const isRandom = await handleAudio.randomList();
    setRandomMode(isRandom);
  };

  const pauseSound = () => {
    handleAudio.pauseAudio();
    setStatus(false);
    setIsplaying(false);
    clearInterval(intervalRef.current);
  };

  const playSound = () => {
    handleAudio.playAudio();
    setStatus(true);
    setIsplaying(true);
  };

  const backAudio = async () => {
    handleAudio.pauseAudio();
    await handleAudio.backSound();
    await handleSound();
    setStatus(true);
    setPosition(0);
  };

  const changeAudio = async () => {
    setIsplaying(false);
    handleAudio.pauseAudio();
    await handleAudio.changeSound();
    await handleSound();
    setStatus(true);
    setPosition(0);
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
                  randomMode && {
                    backgroundColor: '#222',
                    padding: 5,
                    borderRadius: 50
                  }
                }
                onPress={() => {
                  randomMode ? randomList(false) : randomList(true);
                }}
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
                  if (status) {
                    return pauseSound();
                  }
                  playSound();
                }}
              >
                {status ? <PauseIcon /> : <PlayIcon />}
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
