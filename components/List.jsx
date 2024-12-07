import { memo } from 'react';

import Musics from './Musics.jsx';
import { View, ActivityIndicator, ScrollView } from 'react-native';
const List = memo(function List({ albumVisible, playListName }) {
  return (
    <View>
      {albumVisible.length !== 0 ? (
        <>
          <ScrollView>
            {albumVisible.map((item) => {
              return item ? (
                <Musics
                  key={item.id}
                  album={item}
                  list={albumVisible}
                  playListName={playListName}
                />
              ) : null;
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
