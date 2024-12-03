import { useEffect, useState } from 'react';
import { handleStorage } from '../../lib/storageObject';
import { useLocalSearchParams } from 'expo-router';
import { ImageBackground, StyleSheet } from 'react-native';
import List from '../../components/List';

export default function InPlayList() {
  const { playListName } = useLocalSearchParams();
  const [playList, setPlayList] = useState([]);
  
  useEffect(() => {
    musics();
  }, []);

  const musics = async () => {
    const list = await handleStorage.getItem(playListName);
    setPlayList(list);
    console.log('listss', list);
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo.jpeg')}
      className="flex-1 "
      style={styles.imgBack}
    >
      {playList[0] && <List albumVisible={playList.musicList} />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBack: {
    flex: 1,
    ResizeMode: 'cover'
  }
});
