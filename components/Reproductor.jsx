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
  PauseIcon,
} from './Icons';
import { useEffect, useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { getPermission, getSound } from '../lib/files';
import { duration } from '../lib/duration';
import { pauseAudio, playAudio } from '../lib/playAudio';

export default function Reproductor({
  fileId,
  positionAudio,
  handleFile,
  fileAudio,
  status,
  isPlaying,
  changeSound,
  randomList,
  albumSound,
  randomMode,
  backSound,
  handlePosition,
  rangeProcess
}) {
  const [sound, setSound] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [state, setState] = useState(true);
  useEffect(() => {
    const backAction = () => {
      handleFile(fileId, false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [fileId]);
  useEffect(() => {
    getSound(fileId).then((assets) => {
      setSound(assets[0]);
      setSeconds(duration(assets[0].duration));
    });
  }, [fileId]);
  const pauseSound = () => {
    pauseAudio(fileAudio);
    isPlaying(true);
    clearInterval();
  };
  const playSound = () => {
    playAudio(fileAudio);
    isPlaying(false);
    rangeProcess(fileAudio);
  };

  const updatePositionSound = async (position) => {
    const positionSound = await fileAudio.setPositionAsync(position * 1000);
    handlePosition(positionSound.positionMillis / 1000,sound.duration);
  };

  /*if (sound && duration(positionAudio) == seconds && state) {
    pauseSound();
    changeSound(id).then((obj) => {
      setId(obj.num);
      setSound(obj.sound);
      setSeconds(obj.seconds);
      setState(false);
      isPlaying(false);
      setPositionAudio(0);
    });
  }*/

  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      style={styles.imgBack}
    >{
      sound && <View style={styles.contSound}>
        <View style={styles.contImg}>
          <Image source={LogoPro} style={styles.img} />
        </View>
        <View style={styles.contInterfaz}>
          <View style={styles.contText}>
            <Text style={styles.textTitle} className="h-11">
              {sound.filename}{' '}
            </Text>
          </View>
          <View style={styles.slider}>
            <Slider
              minimumTrackTintColor="#18f"
              maximumTrackTintColor="#fff"
              minimumValue={0}
              maximumValue={sound.duration}
              value={positionAudio}
              onValueChange={(value) => updatePositionSound(value[0])}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ color: '#fff' }}>{duration(positionAudio)} </Text>
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
              onPress={() => {
                pauseSound();
                backSound(fileId).then((obj) => {
                  setSound(obj.sound);
                  setSeconds(obj.seconds);
                  setState(false);
                  isPlaying(false);
                });
              }}
            >
              <LeftIcon />
            </TouchableHighlight>
            <Pressable
              onPress={() => {
                status ? playSound() : pauseSound();
              }}
            >
              {!status ? <PauseIcon /> : <PlayIcon />}
            </Pressable>
            <TouchableHighlight
              activeOpacity={0.7}
              underlayColor="#222"
              style={styles.icons}
              onPress={() => {
                pauseSound();
                changeSound(fileId).then((obj) => {
                  setSound(obj.sound);
                  setSeconds(obj.seconds);
                  setState(false);
                  isPlaying(false);
                });
              }}
            >
              <RightIcon />
            </TouchableHighlight>
            <RepeatIcon />
          </View>
        </View>
      </View>}
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
