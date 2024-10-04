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
import { useEffect, useState } from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import { duration } from '../lib/duration';
import {
  backSound,
  changeSound,
  createAudioApp,
  pauseAudio,
  playAudio,
  randomList,
  updatePositionSound
} from '../lib/playAudio';
import { useSound } from '../lib/zustand';

export default function Reproductor({
  route
}) {
  const [sound, setSound] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [state, setState] = useState(true);

  const {
    fileAudio,
    assets,
    addAudioAssets,
    updateAlbumSound,
    albums,
    albumSound,
    updateAlbums,
    addSound
  } = useSound();
  const { filename, durationAudio, id } = route.params;
  useEffect(() => {
    setSound({
      id,
      filename,
      duration: durationAudio
    });
  }, []);

  const pauseSound = () => {
    pauseAudio(fileAudio);
    addAudioAssets({ ...assets, isPlaying: true });
    clearInterval();
  };
  const playSound = () => {
    playAudio(fileAudio);
    addAudioAssets({ ...assets, isPlaying: false });
    //rangeProcess(fileAudio);
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      style={styles.imgBack}
    >
      {assets && sound && (
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
              <Slider
                minimumTrackTintColor="#18f"
                maximumTrackTintColor="#fff"
                minimumValue={0}
                maximumValue={assets.duration}
                value={assets.position}
                onValueChange={(value) =>
                  updatePositionSound(value[0]).then((position) => {
                    addAudioAssets({ ...assets, position: position });
                  })
                }
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ color: '#fff' }}>
                  {assets.position && duration(assets.position)}
                </Text>
                <Text style={styles.duration}>{duration(sound.duration)} </Text>
              </View>
            </View>

            <View style={styles.contPlay}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#222"
                style={
                  assets.isRandom && {
                    backgroundColor: '#222',
                    padding: 5,
                    borderRadius: 50
                  }
                }
                onPress={() => {
                  assets.isRandom
                    ? randomList(false).then(({ albumRandom, isRandom }) => {
                        updateAlbumRandom(albumRandom);
                        addAudioAssets({ ...assets, isRandom: isRandom });
                      })
                    : randomList(true).then(({ albumRandom, isRandom }) => {
                        updateAlbumRandom(albumRandom);
                        addAudioAssets({ ...assets, isRandom: isRandom });
                      });
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
                  backSound(assets.id, albums, albumSound).then((obj) => {
                    setSound(obj.arrayUri[0]);
                    const album = obj.arrayUri[0];
                    addAudioAssets({
                      ...assets,
                      id: parseInt(obj.num),
                      uri: album.uri,
                      duration: album.duration,
                      position: 0,
                      filename: album.filename,
                      isPlaying: false
                    });
                    createAudioApp(album.uri).then((file)=>{
                      addSound(file)
                    });
                  });
                }}
              >
                <LeftIcon />
              </TouchableHighlight>
              <Pressable
                onPress={() => {
                  assets.isPlaying ? playSound() : pauseSound();
                }}
              >
                {!assets.isPlaying ? <PauseIcon /> : <PlayIcon />}
              </Pressable>
              <TouchableHighlight
                activeOpacity={0.7}
                underlayColor="#222"
                style={styles.icons}
                onPress={() => {
                  pauseSound();
                  changeSound(assets.id, albums, albumSound).then((obj) => {
                    setSound(obj.arrayUri[0]);
                    const album = obj.arrayUri[0];
                    addAudioAssets({
                      ...assets,
                      id: parseInt(album.id),
                      uri: album.uri,
                      duration: album.duration,
                      position: 0,
                      filename: album.filename,
                      isPlaying: false
                    });
                    createAudioApp(album.uri).then((file)=>{
                      addSound(file)
                    });
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
