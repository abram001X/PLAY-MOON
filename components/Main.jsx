import { useEffect, useState } from 'react';
import {
  Button,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  StatusBar
} from 'react-native';
import { Audio } from 'expo-av';
import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPermission } from '../lib/files.js';
import * as MediaLibrary from 'expo-media-library';
import { Stack } from 'expo-router';
import { Plane } from './Plane.jsx';
import { createAudioApp, pauseAudio, } from '../lib/playAudio.js';
import Reproductor from './Reproductor.jsx';
export default function Main() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState();
  const [pages, setPages] = useState(500);
  const [morePages, setMorePages] = useState(true);
  const [loading, setLoading] = useState(true); //passar a false
  const [reproductor, setReproductor] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [fileAudio, setFileAudio] = useState(null);
  const [status, setStatus] = useState(true);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    getPermission(permissionResponse, requestPermission).then((assets) => {
      setAlbums(assets);
    });
  }, [permissionResponse, requestPermission]);
  const handleFile = (id, render = true) => {
    setReproductor(render);
    setFileId(id);
  };
  const createAudio = (uri) => {
    if(fileAudio){
      pauseAudio(fileAudio)
    }
    createAudioApp(uri).then((file) => {
      setFileAudio(file);
    });
    setStatus(false)
  };
  const isPlaying = (state)=>{
    setStatus(state)
  }
  return (
    <>
      {reproductor && (
        <Reproductor
          fileId={fileId}
          handleFile={handleFile}
          createAudio={createAudio}
          fileAudio={fileAudio && fileAudio}
          isPlaying={isPlaying}
          status={status}
        />
      )}
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={reproductor ? { display: 'none' } : styles.imgBack}
      >
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: '#ccc' },
              headerTitle: 'PLAYMOON',
              headerTintColor: '#000'
            }}
          />
          <View className="p-2">
            {albums ? (
              <>
                <Plane fileAudio={fileAudio && fileAudio} isPlaying={isPlaying} status={status}/>
                <FlatList
                  data={albums}
                  keyExtractor={(album) => album.id}
                  //onEndReached={handleLoadMore}
                  //onEndReachedThreshold={0.5}
                  renderItem={({ item }) => (
                    <Musics
                      album={item}
                      handleFile={handleFile}
                      createAudio={createAudio}
                    />
                  )}
                />
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
  }
});
