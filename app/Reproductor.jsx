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
export default function Reproductor() {
  const [seconds, setSeconds] = useState(null);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef(null);
  const [isRandom, setIsRandom] = useState(false);
  const { setSoundFile, setIsPlay, isPlay } = useContext(AudioContext);

  useEffect(() => {
    handleSound();
  }, []);

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(async () => {
        const seconds = await handleAudio.rangeProccess();
        console.log(seconds);
        setPosition(seconds);
        if (seconds + 1 >= sound.duration) {
          changeAudio();
        }
      }, 900);
      intervalRef.current = interval;
    } else clearInterval(intervalRef.current);
  }, [isPlay]);

  const handlePosition = async (value) => {
    //value[0]
    await handleAudio.handlePosition(value[0] * 1000);
    setPosition(value[0]);
  };

  const handleSound = async () => {
    const res = await handleAudio.getSound();
    setIsPlay(isPlay === null ? true : isPlay);
    setSeconds(duration(res[0].duration));
    setSound(res[0]);
    setSoundFile(res[0]);
    clearInterval(intervalRef.current);
  };

  const randomList = async () => {
    const res = await handleAudio.handleListRandom();
    setIsRandom(res);
  };

  const pauseSound = () => {
    handleAudio.pauseAudio();
    setIsPlay(false);
    clearInterval(intervalRef.current);
  };

  const playSound = () => {
    handleAudio.playAudio();
    setIsPlay(true);
  };

  const backAudio = async () => {
    setIsPlay(true);
    await handleAudio.backSound();
    await handleSound();
    setPosition(0);
  };

  const changeAudio = async () => {
    clearInterval(intervalRef.current)
    setIsPlay(false);
    await handleAudio.changeSound();
    await handleSound();
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
