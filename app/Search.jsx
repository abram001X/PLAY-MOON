import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { BackIcon, SearchIcon } from '../components/Icons';
import { StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import { useContext, useState } from 'react';
import { AudioContext } from '../provider/AudioProvider';
import Musics from '../components/Musics';

export default function Search() {
  const [listAudio, setListAudio] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const { albums } = useContext(AudioContext);
  const handleSearch = (text) => {
    if (text == '') {
      setListAudio([]);
    } else
      setListAudio(
        albums.filter((obj) =>
          obj.filename.toLowerCase().includes(text.toLowerCase())
        )
      );
    setIsSearch(false);
  };
  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      className="flex-1"
      style={styles.imgBack}
    >
      <View className="flex-row fixed z-30 items-center border-b bg-slate-200 opacity-70">
        <TextInput
          className="h-11 p-3 flex-1 text-black"
          placeholder="Buscar"
          onChangeText={(text) => {
            setIsSearch(true);
            handleSearch(text);
          }}
        />
        <SearchIcon />
      </View>
      <View className="flex-1">
        {!isSearch ? (
          <>
            <ScrollView>
              {listAudio.map((item) => {
                return <Musics key={item.id} album={item} />;
              })}
            </ScrollView>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imgBack: {
    flex: 1
  }
});
