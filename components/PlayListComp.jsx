import {
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Image
} from 'react-native';
import { MenuIconVertical } from './Icons';
import LogoPro from '../assets/logoSimple.jpeg';

import Modal from 'react-native-modal';
import { useState } from 'react';
import { handleStorage } from '../lib/storageObject';
import ChangePlaylist from './ChangePlaylist';
export default function PlayListComp({
  playLists,
  isComp,
  deletePlaylist,
  setPlayLists
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(false);
  const [playListName, setPlayListName] = useState('');
  const changeList = async () => {
    const value = await handleStorage.changeNamePlaylist(
      playLists.name,
      playListName
    );
    setPlayLists(value);
  };
  return (
    <>
      <View className="flex-row  p-2 pl-0">
        <Image source={LogoPro} style={styles.img} />
        <View className="flex-shrink w-full">
          <Text className="text-white ml-2 h-4 text-sm">{playLists.name}</Text>
          <Text className="text-slate-300 ml-2 mt-3">
            {' '}
            Músicas : {playLists.musicsCount}
          </Text>
        </View>
        {isComp ? (
          <View className="justify-center">
            <TouchableHighlight
              className="rounded-full"
              activeOpacity={0.6}
              underlayColor="#aaa"
              onPress={() => setIsOpen(true)}
            >
              <View>
                <MenuIconVertical size={19} className="p-1" />
              </View>
            </TouchableHighlight>
          </View>
        ) : null}
      </View>
      <Modal
        className="items-center"
        
        backdropOpacity={0}
        isVisible={isOpen}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={() => setIsOpen(false)}
      >
        <View className="z-30 p-2 bg-black w-56 rounded-md">
          <Text className="text-white p-2">Opciones: </Text>
          <TouchableHighlight
            className="rounded-md"
            activeOpacity={0.8}
            underlayColor={'#666'}
            onPress={() => {
              setIsOpen(false);
              setInput(true);
            }}
          >
            <Text className="text-white p-2">
              Cambiar nombre de la playlist{' '}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            className="rounded-md"
            activeOpacity={0.8}
            underlayColor={'#666'}
            onPress={() => deletePlaylist(playLists.name)}
          >
            <Text className="text-red-700 p-2 mt-4">ELIMINAR PLAYLIST</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <Modal
        className="items-center"
        isVisible={input}
        animationIn={'bounceIn'}
        
        backdropOpacity={0}
        animationOut={'bounceOut'}
        onBackdropPress={() => setInput(false)}
      >
        <ChangePlaylist
          setIsMenuOpen={setInput}
          setPlayListName={setPlayListName}
          handleList={changeList}
        />
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
