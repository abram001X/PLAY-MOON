import { useState } from 'react';
import { Image, View, Text, Pressable, TouchableHighlight } from 'react-native';
import * as FileSystem from 'expo-file-system';
export default function ListSearch({ list }) {
  const [downloadAudio, setDownloadAudio] = useState();
  const fetchingDownload = async (id) => {
    const responseSearch = await fetch(
      `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '0c96b5c9e8msh2576380e5ba2f6ap11d52bjsna69225b657d3',
          'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
        }
      }
    );
    const data = await responseSearch.json();
    setDownloadAudio(data);
    const downloaResumable = FileSystem.createDownloadResumable(
      data.link,
      FileSystem.documentDirectory + data.title + '.mp3'
    );

    try {
      const result = await downloaResumable.downloadAsync();
      console.log('Se termino la descarga a', result);
      const fileUri = await FileSystem.getInfoAsync(uri);
      console.log('archivo :', fileUri);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <View className="flex-row p-2">
      <Image
        source={{ uri: list.thumbnail && list.thumbnail[0].url }}
        style={{ width: 150, height: 100, borderRadius: 10 }}
      />
      <View className="ml-2 flex-shrink">
        <Text className="text-white text-sm max-h-9">{list.title} </Text>
        <View className="flex-row">
          <Text className="text-slate-200">{list.channelTitle} </Text>
          <Text className="text-slate-200 ml-4">
            °{list.publishedTimeText}{' '}
          </Text>
        </View>
        <View className="">
          <Text className="text-slate-200">{list.lengthText} </Text>
          <TouchableHighlight
            onPress={() => {
              fetchingDownload(list.videoId);
            }}
          >
            <Text className="text-yellow-300 mt-2 text-base">Descargar </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
