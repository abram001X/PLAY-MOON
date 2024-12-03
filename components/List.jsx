import { memo } from 'react';

import Musics from './Musics.jsx';
import { View, ActivityIndicator, ScrollView } from 'react-native';
const List = memo(function List({ albumVisible }) {
  const [playListMenu, setPlayListMenu] = useState(false);
  const [playLists, setPlayLists] = useState([]);
  return (
    <View>
      {albumVisible.length !== 0 ? (
        <>
          <ScrollView>
            {albumVisible.map((item) => {
              return <Musics key={item.id} album={item} list={albumVisible}/>;
            })}
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
});

export default List;
