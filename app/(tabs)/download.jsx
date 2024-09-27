import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  View
} from 'react-native';
import ListSearch from '../../components/ListSearch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function download() {
  const [listSearch, setListSearch] = useState([]);
  const [name, setName] = useState(null);
  const [isLoad, setIsload] = useState(false);
  const insets = useSafeAreaInsets();

  const fetching = async (nameSearch) => {
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

  return (
    <ImageBackground
      source={require('../../assets/fondo.jpeg')}
      className="flex-1"
    >
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
      {isLoad && <View className='mt-2'><ActivityIndicator color={'#fff'} size={25} /></View>}
      <View
        className="justify-center items-center mb-12"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="">
          {listSearch && (
            <FlatList
              data={listSearch}
              keyExtractor={(list) => list.videoId}
              renderItem={({ item }) => <ListSearch list={item} />}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
