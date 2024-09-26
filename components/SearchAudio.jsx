import { Text, TextInput, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { BackIcon, SearchIcon } from './Icons';
import { StyleSheet } from 'react-native';

export default function Search({ handleAlbums }) {
  return (
    <View className="flex-row fixed z-30 items-center border-b bg-slate-200 opacity-70">
      <TextInput
        className="h-11 p-3 flex-1 text-black"
        placeholder="Buscar"
        
        onChangeText={(text) => {handleAlbums(text)}}
      />
      <SearchIcon/>
    </View>
  );
}
