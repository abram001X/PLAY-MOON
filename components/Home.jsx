import { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';
import Musics from './Musics.jsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OrderIcon } from './Icons.jsx';
export default function Home({ albums, orderAlbum }) {
  const albumVisible = useMemo(() => albums, [albums]);
  const insets = useSafeAreaInsets();
  const [pressOrder, setPressOrder] = useState(false);
  return (
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
          {albumVisible ? (
            <>
              <ScrollView>
                {albumVisible.map((item) => {
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
        <TouchableHighlight onPress={() => orderAlbum('fecha')}>
          <Text className="text-white p-2">Fecha </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => orderAlbum('titulo')}>
          <Text className="text-white p-2">Titulo </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => orderAlbum('duration')}>
          <Text className="text-white p-2">Duration</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
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
