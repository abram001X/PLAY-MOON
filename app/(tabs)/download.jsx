import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';
import ListSearch from '../../components/ListSearch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClearIcon} from '../../components/Icons';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
export default function Download() {
  const [listSearch, setListSearch] = useState([]);
  const [name, setName] = useState(null);
  const [isLoad, setIsload] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState(null);
  const [state, setState] = useState(0);
  const [downloadObject, setDownloadObject] = useState(null);
  const insets = useSafeAreaInsets();

  const fetching = async (nameSearch) => {
    //setDownloadMessage(null);
    setIsload(true);
    const responseSearch = await fetch(
      `https://yt-api.p.rapidapi.com/search?query=${nameSearch}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '0c96b5c9e8msh2576380e5ba2f6ap11d52bjsna69225b657d3',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      }
    );
    const data = await responseSearch.json();
    setListSearch(data.data.filter((obj) => obj.type == 'video'));
    setIsload(false);
  };
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log(progress);
    setState(Math.round(progress * 100));
  };
  const fetchingDownload = async (id) => {
    setDownloadMessage('Descargando audio');
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
    const downloadResumable = FileSystem.createDownloadResumable(
      data.link,
      FileSystem.documentDirectory + data.title + '.mp3',
      {},
      callback
    );
    setDownloadObject(downloadResumable);
    console.log(downloadResumable);
    try {
      const { uri } = await downloadResumable.downloadAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      if (asset) setDownloadMessage('Audio descargado');
      console.log('assets', asset);
    } catch (e) {
      console.log(e.message);
    }
  };

  const cancelDownload = async () => {
    try {
      await downloadObject.cancelAsync();
      console.log('cancelado');
      setDownloadMessage('Descarga cancelada');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <View className="border flex-row">
        <TextInput
          className="p-2 bg-white flex-1"
          placeholder="Buscar video para descargar en formato de audio"
          onChangeText={(text) => {
            setName(text);
          }}
          onSubmitEditing={() => {
            fetching(name);
          }}
        />
      </View>
      <ImageBackground
        source={require('../../assets/fondo.jpeg')}
        className="flex-1"
      >
        {isLoad && (
          <View className="mt-2">
            <ActivityIndicator color={'#fff'} size={25} />
          </View>
        )}
        <View
          className="justify-center items-center"
          style={{ paddingBottom: insets.bottom }}
        >
          <View className="mt-5">
            {listSearch && (
              <FlatList
                data={listSearch}
                keyExtractor={(list) => list.videoId}
                renderItem={({ item }) => (
                  <ListSearch
                    list={item}
                    setDownloadMessage={setDownloadMessage}
                    fetchingDownload={fetchingDownload}
                  />
                )}
              />
            )}
          </View>
          {downloadMessage && downloadMessage == 'Descargando audio' ? (
            <View className=" w-60 justify-around items-center flex-row relative z-40 -translate-y-10 text-black text-sm bg-yellow-500 rounded-xl p-1 self-start ">
              <Text className="border border-yellow-500 text-base">
                {downloadMessage} {state}%{' '}
              </Text>
              <Pressable onPress={cancelDownload}>
                <ClearIcon size={20} />
              </Pressable>
            </View>
          ) : (
            <Text className="relative z-40 -translate-y-10 text-black text-sm bg-yellow-500 rounded-xl p-1 self-center ">
              {downloadMessage}{' '}
            </Text>
          )}
        </View>
      </ImageBackground>
    </>
  );
}
