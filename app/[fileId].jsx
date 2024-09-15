import LogoPro from '../assets/logoSimple.jpeg';
import {
  Image,
  StyleSheet,
  View,
  Button,
  Text,
  Dimensions,
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
import { playAudio } from '../lib/playAudio';

export default function InterfacePlay() {
  const [sound, setSound] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [valueRange, setValueRange] = useState('0:00');
  const { fileId } = useLocalSearchParams();
  
  const [pauseOrPlay, setPauseOrPlay] = useState(false)
  useEffect(() => {
    getSound(fileId).then((assets) => {
      setSound(assets);
      setSeconds(duration(assets[0].duration));
    });
  }, [fileId]);
  
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
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ color: '#fff' }}>{valueRange} </Text>
              <Text style={styles.duration}>{seconds && seconds} </Text>
            </View>
          </View>

          <View style={styles.contPlay}>
            <RandomIcon />
            <LeftIcon />
            <TouchableHighlight onPress={()=>{setPauseOrPlay(pauseOrPlay ? false: true);playAudio(sound && sound[0].uri,pauseOrPlay)}}>
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
