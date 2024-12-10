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
import PlayListComp from '../components/PlayListComp';
import ChangePlaylist from '../components/ChangePlaylist';

export default function Playlist() {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playListName, setPlayListName] = useState('');
  const [playList, setPlayLists] = useState([]);
  useEffect(() => {
    lists();
  }, []);

  const lists = async () => {
    const list = await handleStorage.getItems();
    setPlayLists(list);
    //console.log('list', list);
  };
  const createList = async () => {
    const value = await handleStorage.createPlayList(playListName, []);
    setPlayLists(value);
  };
  const deletePlaylist = async (name) => {
    const value = await handleStorage.removePlaylist(name);
    setPlayLists(value);
  };
  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      className="flex-1"
      style={styles.imgBack}
    >
      <View className="flex-1">
        <View className="flex-row p-2 justify-evenly items-center border-b-white border-b">
          <Text className=" w-2/3 text-white text-lg text-center">
            LISTA DE REPRODUCCIÓN : ({playList.length})
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
                return item ? (
                  <TouchableHighlight
                    className="rounded-md"
                    activeOpacity={0.8}
                    underlayColor={'#666'}
                    key={j}
                    onPress={() =>
                      navigation.navigate('InPlayList', {
                        playListName: item.name
                      })
                    }
                  >
                    <PlayListComp
                      playLists={item}
                      isComp={true}
                      deletePlaylist={deletePlaylist}
                      setPlayLists={setPlayLists}
                    />
                  </TouchableHighlight>
                ) : null;
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
        backdropOpacity={0}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        onBackdropPress={() => setIsMenuOpen(false)}
      >
        <ChangePlaylist
          setIsMenuOpen={setIsMenuOpen}
          setPlayListName={setPlayListName}
          handleList={createList}
        />
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1
  }
});
