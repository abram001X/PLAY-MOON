import { useContext, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';

import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import { handleAudio } from '../lib/audioObject.js';
import { AudioContext } from '../provider/AudioProvider.jsx';

export default function Main() {
  const insets = useSafeAreaInsets();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const {albums, setAlbums} = useContext(AudioContext)
  useEffect(() => {
    handleAudio
      .getPermission(permissionResponse, requestPermission)
      .then((assets) => {
        setAlbums(assets);
      });
  }, [permissionResponse, requestPermission]);

  return (
    <>
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={styles.imgBack}
      >
        <View className="z-0 " style={{ paddingBottom: insets.bottom }}>
          <View>
            {albums ? (
              <>
                <ScrollView>
                  {albums.map((item) => {
                    return <Musics key={item.id} album={item} />;
                  })}
                </ScrollView>
              </>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
    ResizeMode: 'cover'
  },
  list: {
    marginBottom: 84
  }
});
