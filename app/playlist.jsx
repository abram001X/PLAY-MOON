import { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  Pressable
} from 'react-native';
import { handleStorage } from '../lib/storageObject';
import { AddIcon } from '../components/Icons';
import Modal from 'react-native-modal';
import { Link, Stack } from 'expo-router';
import PlayListComp from '../components/PlayListComp';

export default function playlist() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playListName, setPlayListName] = useState('');
  const [playList, setPlayLists] = useState([]);
  useEffect(() => {
    lists();
  }, []);

  const lists = async () => {
    const list = await handleStorage.getItems();
    setPlayLists(list);
    console.log('list', list);
  };
  const createList = async () => {
    const value = await handleStorage.createPlayList(playListName, null);
    setPlayLists(value);
  };
  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      className="flex-1"
      style={styles.imgBack}
    >
      <Pressable onPress={async () => await handleStorage.clearStorage()}>
        <Text>Eliminar las playlists</Text>
      </Pressable>
      <Stack.Screen
        options={{
          headerRight: () => {}
        }}
      />
      <View className="flex-1">
        <View className="flex-row p-2 justify-evenly items-center border-b-white border-b">
          <Text className=" w-2/3 text-white text-lg text-center">
            LISTA DE REPRODUCCIÓN : (0)
          </Text>
          <TouchableHighlight
            className="rounded-md"
            activeOpacity={0.8}
            underlayColor={'#666'}
            onPress={() => setIsMenuOpen(true)}
          >
            <AddIcon
              className="p-2 bg-slate-800 rounded-md opacity-70"
              color="white"
              size={18}
            />
          </TouchableHighlight>
        </View>
        <View>
          {playList.length !== 0 ? (
            <ScrollView>
              {playList.map((item, j) => {
                return (
                  item && (
                    <Link asChild href={`/playlist/${item.name}`} key={j}>
                      <TouchableHighlight
                        className="rounded-md"
                        activeOpacity={0.8}
                        underlayColor={'#666'}
                        key={j}
                      >
                        <PlayListComp playLists={item} isComp={true} />
                      </TouchableHighlight>
                    </Link>
                  )
                );
              })}
            </ScrollView>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
      <Modal
        className="items-center"
        isVisible={isMenuOpen}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={() => setIsMenuOpen(false)}
      >
        <View className="p-3 rounded-md w-80 bg-black">
          <Text className="mb-4 text-white border-b border-b-white p-1">
            Nombre de tu nueva playlist
          </Text>
          <TextInput
            className="p-2 text-black bg-white mt-2"
            placeholder="Nombre"
            onChangeText={(text) => {
              setPlayListName(text);
            }}
          />
          <TouchableHighlight
            className="rounded-md"
            activeOpacity={0.8}
            underlayColor={'#666'}
            onPress={createList}
          >
            <Text className="text-white mt-4 p-2 bg-slate-500 rounded w-16 text-center self-center">
              Crear{' '}
            </Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1
  }
});
