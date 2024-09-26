import { useState } from 'react';
import { FlatList, ImageBackground, Text, TextInput, View } from 'react-native';
import ListSearch from '../../components/ListSearch';

export default function download() {
  const [listSearch, setListSearch] = useState([]);
  const [name, setName] = useState(null);
  const fetching = async (nameSearch) => {
    const responseSearch = await fetch(
      `https://yt-api.p.rapidapi.com/search?query=${nameSearch}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':'0c96b5c9e8msh2576380e5ba2f6ap11d52bjsna69225b657d3',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      }
    );
    const data = await responseSearch.json()
    setListSearch(data.data)
  };
  return (
    <ImageBackground
      source={require('../../assets/fondo.jpeg')}
      className="flex-1"
    >
      <View className="justify-center items-center">
        <View className="border flex-row">
          <TextInput
            className=" p-2 bg-white flex-1"
            placeholder="Buscar Musica"
            onChangeText={(text) => {
              setName(text);
            }}
            onSubmitEditing={() => {
              fetching(name);
            }}
          />
        </View>
        <FlatList 
          data={listSearch}
          keyExtractor={(list)=> list.videoId}
          renderItem={({item})=> <ListSearch list={item}/>}
        />
      </View>
    </ImageBackground>
  );
}
