import { useContext, useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';

import Musics from './Musics.jsx';
import Plane from './Plane.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Search from './SearchAudio.jsx';
import * as MediaLibrary from 'expo-media-library';
import { handleAudio } from '../lib/audioObject.js';

export default function Main() {
  const insets = useSafeAreaInsets();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState(null);
  const [listAudio, setListAudio] = useState([]);
  useEffect(() => {
    handleAudio
      .getPermission(permissionResponse, requestPermission)
      .then((assets) => {
        setAlbums(assets);
        setListAudio(assets);
      });
  }, [permissionResponse, requestPermission]);

  const handleAlbums = (text) => {
    if (text !== '') {
      return setAlbums(
        listAudio.filter((obj) =>
          obj.filename.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
    setAlbums(listAudio);
  };

  return (
    <>
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={styles.imgBack}
      >
        <Search handleAlbums={handleAlbums} />
        <View className="z-0 mb-11 " style={{ paddingBottom: insets.bottom }}>
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
