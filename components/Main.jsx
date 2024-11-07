import { useEffect, useState } from 'react';
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
import Plane from './Plane.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Search from './SearchAudio.jsx';
import * as MediaLibrary from 'expo-media-library';
import { handleAudio } from '../lib/audioObject.js';

export default function Main() {
  const insets = useSafeAreaInsets();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState(null);

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
        <View
          className="z-0 mb-32"
          style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        >
          {/* <Search albums={albums} />*/}
          <View className='p-1 pt-0 pb-0 '>
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
            <Plane />
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
