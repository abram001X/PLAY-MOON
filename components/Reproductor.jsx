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
} from './Icons';
import { useContext, useEffect, useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { duration } from '../lib/duration';
import { handleAudio } from '../lib/audioObject.js';
export default function Reproductor({id}) {
  const [sound, setSound] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [status, setStatus] = useState(false);
  //const [state, setState] = useState(true);
  const [randomMode, setRandomMode] = useState(false);
  //const { handleAudio } = useContext(AudioContext);
  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [id]);
  useEffect(() => {
    console.log(id);
    handleAudio.getSound(id).then((assets) => {
      setSound(assets[0]);
      console.log(assets);
      //setSeconds(duration(assets[0].duration));
    });
  }, [id]);

  const randomList = async () => {
    const isRandom = await handleAudio.randomList();
    setRandomMode(isRandom);
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
              <Text style={styles.textTitle} className="h-11">
                {sound.filename}{' '}
              </Text>
            </View>
            <View style={styles.slider}>
              {/*<Slider
                minimumTrackTintColor="#18f"
                maximumTrackTintColor="#fff"
                minimumValue={0}
                maximumValue={sound.duration}
                value={positionAudio}
                onValueChange={(value) => updatePositionSound(value[0])}
              />*/}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                {/*<Text style={{ color: '#fff' }}>
                  {duration(positionAudio)}{' '}
                </Text>*/}
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
                  handleAudio.pauseAudio();
                  handleAudio.backSound(id).then((obj) => {
                    setSound(obj.sound);
                    setSeconds(obj.seconds);
                    //setState(false);
                    setStatus(false);
                  });
                }}
              >
                <LeftIcon />
              </TouchableHighlight>
              <Pressable
                onPress={() => {
                  if (status) {
                    handleAudio.pauseAudio();
                    setStatus(false);
                  } else {
                    handleAudio.playAudio();
                    setStatus(true);
                  }
                }}
              >
                {!status ? <PauseIcon /> : <PlayIcon />}
              </Pressable>
              <TouchableHighlight
                activeOpacity={0.7}
                underlayColor="#222"
                style={styles.icons}
                onPress={() => {
                  handleAudio.pauseAudio();
                  handleAudio.changeSound(id).then((obj) => {
                    setSound(obj.sound);
                    setSeconds(obj.seconds);
                    //setState(false);
                    setStatus(false);
                  });
                }}
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
