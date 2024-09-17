import LogoPro from '../assets/logoSimple.jpeg';
import {
  Image,
  StyleSheet,
  View,
  Button,
  Text,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import {
  LeftIcon,
  PLayIcon,
  RandomIcon,
  RepeatIcon,
  RightIcon
} from '../components/Icons';
import { useEffect, useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { getSound } from '../lib/files';
import { duration } from '../lib/duration';
import { Audio } from 'expo-av';

export default function InterfacePlay() {
  const [sound, setSound] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [fileAudio, setFileAudio] = useState(null);
  const { fileId } = useLocalSearchParams();
  const [pauseOrPlay, setPauseOrPlay] = useState(true);
  const [positionAudio, setPositionAudio] = useState(0);
  useEffect(() => {
    getSound(fileId).then((assets) => {
      setSound(assets);
      createAudio(assets[0].uri);
      setSeconds(duration(assets[0].duration));
    });
  }, [fileId]);

  const createAudio = async (uri) => {
    const { sound: soundObject } = await Audio.Sound.createAsync({
      uri
    });
    const currentStatus = await soundObject.getStatusAsync();
    setPositionAudio(currentStatus.positionMillis / 1000);
    return setFileAudio(soundObject);
  };

  const pauseSound = async () => {
    await fileAudio.pauseAsync();
    setPauseOrPlay(true);
    clearInterval();
  };
  const playSound = async () => {
    await fileAudio.playAsync();
    setPauseOrPlay(false);
    setInterval(async () => {
      const currentStatus = await fileAudio.getStatusAsync();
      if (currentStatus.isPlaying) {
        setPositionAudio(currentStatus.positionMillis / 1000);
      }
    }, 1000);
  };
  const updatePositionSound = async (position) => {
    clearInterval();
    const positionSound = await fileAudio.setPositionAsync(position * 1000);
    setPositionAudio(positionSound.positionMillis / 1000);
  };
  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      style={styles.imgBack}
    >
      <View style={styles.contSound}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: '#ddd' },
            headerTitle: 'Reproductor',
            headerTintColor: '#000'
          }}
        />
        <View style={styles.contImg}>
          <Image source={LogoPro} style={styles.img} />
        </View>
        <View style={styles.contInterfaz}>
          <View style={styles.contText}>
            <Text style={styles.textTitle}>
              {sound && sound[0].filename.slice(0, 50)}...{' '}
            </Text>
          </View>
          <View style={styles.slider}>
            <Slider
              minimumTrackTintColor="#18f"
              maximumTrackTintColor="#fff"
              minimumValue={0}
              maximumValue={sound && sound[0].duration}
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
            <RandomIcon />
            <LeftIcon />
            <TouchableHighlight
              onPress={() => {
                pauseOrPlay ? playSound() : pauseSound();
              }}
            >
              <PLayIcon />
            </TouchableHighlight>
            <RightIcon />
            <RepeatIcon />
          </View>
        </View>
      </View>
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
    width: 200
  },
  duration: {
    color: '#fff'
  },
  imgBack: {
    flex: 1,
    ResizeMode: 'cover'
  }
});
