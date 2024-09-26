import { Text, TextInput, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { BackIcon } from './Icons';
import { StyleSheet } from 'react-native';

export default function Search({ handleAlbums }) {
  return (
    <View className="flex-row fixed z-30">
      <TextInput
        className="h-11 p-3 flex-1 bg-slate-200 opacity-80"
        placeholder="Buscar"
        onChangeText={(text) => {handleAlbums(text)}}
      />
    </View>
  );
}
