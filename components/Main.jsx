import { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPermission, getSound } from '../lib/files.js';
import * as MediaLibrary from 'expo-media-library';
import { Link, Stack } from 'expo-router';
import { Plane } from './Plane.jsx';
import { createAudioApp, pauseAudio } from '../lib/playAudio.js';
import Reproductor from './Reproductor.jsx';
import { duration } from '../lib/duration.js';
import { SearchIcon } from './Icons.jsx';
import Search from './SearchAudio.jsx';
export default function Main() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState();
  const [pages, setPages] = useState(500);
  const [morePages, setMorePages] = useState(true);
  const [loading, setLoading] = useState(true); //pasar a false
  const [reproductor, setReproductor] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [fileAudio, setFileAudio] = useState(null);
  const [status, setStatus] = useState(true);
  const [fileName, setFileName] = useState(null);
  const [albumSound, setAlbumSound] = useState([]); //<---ojo
  const [randomMode, setRandomMode] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [listAudio, setListAudio] = useState([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    getPermission(permissionResponse, requestPermission).then((assets) => {
      setAlbums(assets);
      setListAudio(assets);
      setAlbumSound(
        assets.map((obj) => {
          return parseInt(obj.id);
        })
      );
    });
  }, [permissionResponse, requestPermission]);
  const handleFile = (id, render = true) => {
    const num = id;
    setReproductor(render);
    setFileId(num);
  };

  const createAudio = (uri, name) => {
    setFileName(name);
    if (fileAudio) {
      pauseAudio(fileAudio);
    }
    createAudioApp(uri).then((file) => {
      setFileAudio(file);
    });
    setStatus(false);
  };

  const isPlaying = (state) => {
    setStatus(state);
  };

  const changeSound = async (id) => {
    const num = albumSound[albumSound.indexOf(id) + 1];
    setFileId(num);
    const objectSound = await getSound(num).then((assets) => {
      createAudio(assets[0].uri, assets[0].filename);
      return {
        sound: assets[0],
        seconds: duration(assets[0].duration),
        num
      };
    });
    return objectSound;
  };

  const randomList = (isRandom) => {
    if (isRandom) {
      setAlbumSound(albumSound.sort(() => Math.random() - 0.5));
      setRandomMode(true);
    } else {
      setAlbumSound(albumSound.sort((a, b) => a - b));
      setRandomMode(false);
    }
  };
  const handleAlbums = (nameAudio) => {
    const name = nameAudio.toLowerCase();
    if (nameAudio) {
      setAlbums(
        listAudio.filter((obj) => obj.filename.toLowerCase().includes(name))
      );
    } else {
      setAlbums(listAudio);
    }
  };
  //console.log(fileId)
  //console.log(isSearch);
  return (
    <>
      {reproductor && (
        <Reproductor
          fileId={parseInt(fileId)}
          handleFile={handleFile}
          createAudio={createAudio}
          fileAudio={fileAudio && fileAudio}
          isPlaying={isPlaying}
          status={status}
          changeSound={changeSound}
          randomList={randomList}
          albumSound={albumSound && albumSound}
          randomMode={randomMode}
        />
      )}
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={reproductor ? { display: 'none' } : styles.imgBack}
      >
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
          <Search albums={albums} handleAlbums={handleAlbums} />
          <View
            className={isSearch ? 'p-1 pt-0 mb-4' : 'p-1 pt-0 pb-0'}
            style={fileName && isSearch && styles.list}
          >
            {albums ? (
              <>
                <FlatList
                  data={albums}
                  keyExtractor={(album) => album.id}
                  onScroll={() => {
                    setIsSearch(false);
                  }}
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
      {fileName && !reproductor && (
        <Plane
          fileAudio={fileAudio && fileAudio}
          isPlaying={isPlaying}
          status={status}
          fileName={fileName && fileName}
          albumSound={albumSound}
          fileId={parseInt(fileId)}
          changeSound={changeSound}
          handleFile={handleFile}
        />
      )}
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
