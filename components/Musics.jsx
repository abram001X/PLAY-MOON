import { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import LogoPro from '../assets/logoSimple.jpeg';
import { Link } from 'expo-router';
import { createAudio } from '../lib/playAudio';
export default function Musics({album,handleFile,createAudio}) {
  
  /*return ( ruta para activr [fileId]
    <Link asChild href={`/${album.id}`}>
      <Pressable onPress={()=>{handleFile(album.uri)}}>
        <View key={album.id} className="flex-row  p-2 pl-0">
          <Image source={LogoPro} style={styles.img} />
          <Text className="text-white ml-2">{album.filename}</Text>
        </View>
      </Pressable>
    </Link>
  );*/
  return (
    <Pressable onPress={()=>{createAudio(album.uri);handleFile(album.id)}}>
        <View key={album.id} className="flex-row  p-2 pl-0">
          <Image source={LogoPro} style={styles.img} />
          <Text className="text-white ml-2">{album.filename}</Text>
        </View>
      </Pressable>
  )
}
const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 7
  }
});
