import { useEffect, useState } from 'react';
import {
  Button,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground
} from 'react-native';
import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPermission } from '../lib/files.js';
import * as MediaLibrary from 'expo-media-library';
import { Stack } from 'expo-router';
import { ResizeMode } from 'expo-av';
export default function Main() {
  
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState();
  const [pages, setPages] = useState(500);
  const [morePages, setMorePages] = useState(true);
  const [loading, setLoading] = useState(true); //passar a false
  const insets = useSafeAreaInsets();
  useEffect(() => {
    getPermission(permissionResponse, requestPermission).then((assets) => {
      setAlbums(assets);
    });

  }, [permissionResponse, requestPermission]);

  /*const handleLoadMore = () => {
    if (morePages && loading) {
      setPages(pages + 500);
      getPermission();
    }
  };*/
  //console.log(albums);

  return (
    <ImageBackground source={require('../assets/fondo.jpeg')} style={styles.imgBack}>
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
            <FlatList
              data={albums}
              keyExtractor={(album) => album.id}
              //onEndReached={handleLoadMore}
              //onEndReachedThreshold={0.5}
              renderItem={({ item }) => <Musics album={item} />}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imgBack: {
    flex:1,
    ResizeMode: 'cover'

  }
})