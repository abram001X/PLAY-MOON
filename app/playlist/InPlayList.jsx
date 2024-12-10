import { useEffect, useState } from 'react';
import { handleStorage } from '../../lib/storageObject';
import { ImageBackground, StyleSheet } from 'react-native';
import List from '../../components/List';
import { useNavigation } from '@react-navigation/native';

export default function InPlayList({route}) {
  const navigation = useNavigation()
  const { playListName } = route.params;
  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    musics();
  }, []);

  const musics = async () => {
    const list = await handleStorage.getItem(playListName);
    setPlayList(list.musicList);
    //console.log('listss', list);
  };
  return (
    <ImageBackground
      source={require('../../assets/fondo.jpeg')}
      className="flex-1 "
      style={styles.imgBack}
    >
      <List albumVisible={playList} playListName={playListName} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
    ResizeMode: 'cover'
  }
});
