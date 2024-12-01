import {
  LeftIcon,
  PlayIcon,
  RandomIcon,
  RepeatIcon,
  RightIcon,
  PauseIcon
} from '../components/Icons.jsx';
import LogoPro from '../assets/logoSimple.jpeg';
import { useContext } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Pressable
} from 'react-native';

import { Slider } from '@miblanchard/react-native-slider';
import { duration } from '../lib/duration.js';
import { AudioContext } from '../provider/AudioProvider.jsx';
import { useMemo } from 'react';
import PlaySound from './PlaySound.jsx';
export default function Sound({
  seconds,
  position,
  asset,
  randomList,
  handlePosition,
  pauseSound,
  playSound,
  backAudio,
  changeAudio
}) {
  const sound = useMemo(() => asset, [asset]);
  const { isPlay, isRandom } = useContext(AudioContext);

  return (
    <>
      {sound && (
        <View style={styles.contSound}>
          <View style={styles.contImg}>
            <Image source={LogoPro} style={styles.img} />
          </View>
          <View style={styles.contInterfaz}>
            <PlaySound sound={sound} />
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
                classname="rounded-full"
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
    </>
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
