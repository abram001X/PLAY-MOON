import { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  VirtualizedList,
  Button
} from 'react-native';
import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Reproductor from './Reproductor.jsx';
import Search from './SearchAudio.jsx';
export default function Main({
  albums,
  handleAlbums,
  isSearch,
  fileName,
  navigation
}) {
  const insets = useSafeAreaInsets();

  const getItem = (_data, index) => albums[index];
  const getItemCount = (_data) => 100;
  //console.log(isSearch);

  return (
    <>
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={styles.imgBack}
      >
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
          <Search albums={albums} handleAlbums={handleAlbums} />
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
                        navigation={navigation}
                      />
                    );
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
                        navigation={navigation}
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
