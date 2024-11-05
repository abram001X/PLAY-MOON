import { useContext, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  VirtualizedList
} from 'react-native';
import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Reproductor from '../app/Reproductor.jsx';
import Search from './SearchAudio.jsx';
import Plane from './Plane.jsx';
import * as MediaLibrary from 'expo-media-library';
import { handleAudio } from '../lib/audioObject.js';
import { AudioContext } from '../provider/AudioProvider.jsx';
export default function Main() {
  const insets = useSafeAreaInsets();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
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
  const [isSearch, setIsSearch] = useState(true);
  const [listAudio, setListAudio] = useState([]);
  const [positionAudio, setPositionAudio] = useState(0);
  const [minutes, setMinutes] = useState(null);
  const { setSoundList,albums, setAlbums } = useContext(AudioContext);
  useEffect(() => {
    handleAudio
      .getPermission(permissionResponse, requestPermission)
      .then((assets) => {
        setAlbums(assets);
        //setListAudio(assets);
        setSoundList(
          assets.map((obj) => {
            return parseInt(obj.id);
          })
        );
      });
  }, [permissionResponse, requestPermission]);
  /*const handleFile = (id,render = true) => {
    setFileId(id)
    setReproductor(render);
  };*/

  /*const handlePosition = (range, num) => {
    setMinutes(num);
    setPositionAudio(range);
  };*/

  const isPlaying = (state) => {
    setStatus(state);
  };
  /*const rangeProcess = (file, num) => {
    if (minutes) {
      setInterval(async () => {
        const currentStatus = await file.getStatusAsync();
        if (currentStatus.isPlaying) {
          setPositionAudio(currentStatus.positionMillis / 1000);
        }
      }, 500);
    } else if (num) {
      setInterval(async () => {
        const currentStatus = await file.getStatusAsync();
        if (currentStatus.isPlaying) {
          setPositionAudio(currentStatus.positionMillis / 1000);
        }
      }, 500);
    }
  };*/

  /*
  
  const handleAlbums = (nameAudio) => {
    const name = nameAudio.toLowerCase();
    if (nameAudio) {
      setAlbums(
        listAudio.filter((obj) => obj.filename.toLowerCase().includes(name))
      );
    } else {
      setAlbums(listAudio);
    }
  };*/

  //const getItem = (_data, index) => albums[index];
  //const getItemCount = (_data) => 200;
  //console.log(isSearch);
  return (
    <>
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={styles.imgBack}
      >
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
          {/* <Search albums={albums} />*/}
          <View
            className={isSearch ? 'p-1 pt-0 mb-20' : 'p-1 pt-0 pb-0'}
            style={fileName && isSearch && styles.list}
          >
            {albums ? (
              <>
                <ScrollView>
                  {albums.map((item) => {
                    return (
                      <Musics
                        key={item.id}
                        album={item}
                        //handlePosition={handlePosition}
                      />
                    );
                  })}
                </ScrollView>
              </>
            ) : (
              <ActivityIndicator />
            )}
          </View>
          {fileName && !reproductor && (
            <Plane
              isPlaying={isPlaying}
              status={status}
              fileName={fileName && fileName}
              fileId={parseInt(fileId)}
              handleFile={handleFile}
            />
          )}
        </View>
      </ImageBackground>
    </>
  );
}

/*
<VirtualizedList
                    initialNumToRender={15}
                    renderItem={({ item }) => (
                      <Musics
                        album={item}
                        handleFile={handleFile}
                        createAudio={createAudio}
                        handlePosition={handlePosition}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                  />
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
                        handlePosition={handlePosition}
                      />
                    )}
*/
const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
    ResizeMode: 'cover'
  },
  list: {
    marginBottom: 84
  }
});
