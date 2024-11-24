import { useContext, useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Pressable,
  Text,
  TouchableHighlight
} from 'react-native';

import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import { handleAudio } from '../lib/audioObject.js';
import { AudioContext } from '../provider/AudioProvider.jsx';
import { OrderIcon } from './Icons.jsx';
import orderDate, { orderDuration, orderTitle } from '../lib/orderAlbums.js';
export default function Main() {
  const insets = useSafeAreaInsets();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [pressOrder, setPressOrder] = useState(false);
  const { albums, setAlbums } = useContext(AudioContext);
  useEffect(() => {
    handleAudio
      .getPermission(permissionResponse, requestPermission)
      .then((assets) => {
        setAlbums(assets);
        console.log(assets[0]);
      });
  }, [permissionResponse, requestPermission]);
  const orderAlbum = (orderType) => {
    if (orderType == 'fecha') {
      setAlbums(albums.sort(orderDate));
    }
    if (orderType == 'titulo') {
      setAlbums(albums.sort(orderTitle));
    }
    if (orderType == 'duration') {
      setAlbums(albums.sort(orderDuration));
    }
  };
  return (
    <>
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={styles.imgBack}
      >
        <View className="self-end mr-2 mt-1">
          <TouchableHighlight
            className="rounded-full p-2"
            activeOpacity={0.8}
            underlayColor="#666"
            onPress={() => setPressOrder(true)}
          >
            <OrderIcon />
          </TouchableHighlight>
        </View>
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
        <View
          className={
            !pressOrder
              ? 'hidden'
              : 'absolute z-30 p-2 bg-black w-24 self-end translate-y-12 -translate-x-3'
          }
        >
          <Text className="text-white p-2">Ordenar por: </Text>
          <TouchableHighlight>
            <Text className="text-white p-2">Fecha </Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text className="text-white p-2">Titulo </Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text className="text-white p-2">Duration</Text>
          </TouchableHighlight>
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
