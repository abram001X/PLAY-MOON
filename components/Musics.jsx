import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from 'react-native';
import LogoPro from '../assets/logoSimple.jpeg';
import { duration } from '../lib/duration';
import { router } from 'expo-router';
import { handleAudio } from '../lib/audioObject';
import { MenuIconVertical } from './Icons';
import { TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { handleStorage } from '../lib/storageObject';
import PlayListComp from './PlayListComp';
export default function Musics({ album, list }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const create = async () => {
    await handleAudio.createAudioApp(
      album.uri,
      parseInt(album.id),
      true,
      list && list
    );
    const res = await handleAudio.getObject();
    if (res.getStatusAsync()) router.navigate('/reproductor/true');
  };
  
  const lists = async () => {
    const list = await handleStorage.getItems();
    setPlayLists(list);
    console.log(list);
  };

  return (
    <>
      <Pressable onPress={create}>
        <View key={album.id} className="flex-row  p-2 pl-0">
          <Image source={LogoPro} style={styles.img} />
          <View className="flex-shrink w-full">
            <Text className="text-white ml-2 h-4">{album.filename} </Text>
            <Text className="text-slate-200 ml-2 mt-3">
              {duration(parseFloat(album.duration))}{' '}
            </Text>
          </View>
          <View className="justify-center">
            <TouchableHighlight
              className="rounded-full"
              activeOpacity={0.6}
              underlayColor="#aaa"
              onPress={() => setMenuOpen(true)}
            >
              <MenuIconVertical size={19} className="p-1" />
            </TouchableHighlight>
          </View>
        </View>
      </Pressable>
      <Modal
        className="items-center"
        isVisible={menuOpen}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={() => setMenuOpen(false)}
      >
        <View className="z-30 p-2 bg-black w-56 rounded-md">
          <Text className="text-white p-2">Audio seleccionado: </Text>
          <TouchableHighlight
            className="rounded-md"
            activeOpacity={0.8}
            underlayColor={'#666'}
            onPress={() => {
              setMenuOpen(false);
              setPlayListMenu(true);
              lists();
            }}
          >
            <Text className="text-white p-2 mt-2">Agregar a playlist </Text>
          </TouchableHighlight>
          <TouchableHighlight
            className="rounded-md"
            activeOpacity={0.8}
            underlayColor={'#666'}
            onPress={() => handleAudio.removeAssets([album.id])}
          >
            <Text className="text-red-800 p-2 ">Eliminar audio </Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <Modal
        className="items-center"
        isVisible={playListMenu}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={() => setPlayListMenu(false)}
      >
        <View className="z-30 p-2 bg-black w-56 rounded-md">
          <Text className="text-white p-2">LISTAS DE REPRODUCCIÓN: </Text>
          <ScrollView>
            {playLists[0] && playLists.map((item, j) => {
                return (
                  <TouchableHighlight
                    className="rounded-md"
                    activeOpacity={0.8}
                    underlayColor={'#666'}
                    key={j}
                    onPress={async () => {
                      await handleStorage.addMusicPlayList(item.name, album, 1);
                      setPlayListMenu(false);
                    }}
                  >
                    <PlayListComp playLists={item} isComp={false} />;
                  </TouchableHighlight>
                );
              })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 7
  }
});
