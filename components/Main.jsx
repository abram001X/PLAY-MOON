import { useEffect, useState } from 'react';

import * as MediaLibrary from 'expo-media-library';
import { handleAudio } from '../lib/audioObject.js';
import { OrderIcon } from './Icons.jsx';
import Modal from 'react-native-modal';
import Home from './Home.jsx';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ImageBackground
} from 'react-native';
export default function Main() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [orderType, setOrderType] = useState('fecha desc');
  const [pressOrder, setPressOrder] = useState(false);
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    handleAudio
      .getPermission(permissionResponse, requestPermission)
      .then((assets) => {
        setAlbums(assets);
        console.log(assets[0]);
      });
  }, [permissionResponse, requestPermission]);

  return (
    <>
      <ImageBackground
        source={require('../assets/fondo.jpeg')}
        style={styles.imgBack}
      >
        <View className="self-end mr-2 mt-1">
          <TouchableHighlight
            className="rounded-full"
            activeOpacity={0.8}
            underlayColor="#666"
            onPress={() => setPressOrder(true)}
          >
            <OrderIcon
              className={
                pressOrder
                  ? 'rounded-full p-2 bg-gray-800 opacity-80 text-white'
                  : 'p-2'
              }
            />
          </TouchableHighlight>
        </View>
        <Home albums={albums} orderType={orderType} />
        <Modal
          className="absolute self-end  z-35 "
          isVisible={pressOrder}
          animationIn={'bounceIn'}
          animationOut={'bounceOut'}
          backdropOpacity={0}
          onBackdropPress={() => setPressOrder(false)}
        >
          <View className=" z-30 p-2 bg-black w-24  translate-y-24 rounded-md -translate-x-3">
            <Text className="text-white p-2">Ordenar por: </Text>
            <TouchableHighlight
              className="rounded-md"
              activeOpacity={0.8}
              underlayColor={'#666'}
              onPress={() => {
                setOrderType('fecha desc');
              }}
            >
              <Text className="text-white p-2">Fecha Desc</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="rounded-md"
              activeOpacity={0.8}
              underlayColor={'#666'}
              onPress={() => {
                setOrderType('fecha asc');
              }}
            >
              <Text className="text-white p-2">Fecha Asc</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="rounded-md"
              activeOpacity={0.8}
              underlayColor={'#666'}
              onPress={() => {
                setOrderType('titulo');
              }}
            >
              <Text className="text-white p-2">Titulo </Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="rounded-md"
              activeOpacity={0.8}
              underlayColor={'#666'}
              onPress={() => {
                setOrderType('duration');
              }}
            >
              <Text className="text-white p-2">Duration</Text>
            </TouchableHighlight>
          </View>
        </Modal>
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
