import { useContext, useEffect, useMemo, useState } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { orderAlbum } from '../lib/orderAlbums.js';
import List from './List.jsx';
import { handleAudio } from '../lib/audioObject.js';
export default function Home({ orderType, albums }) {
  const albumVisible = useMemo(
    () => handleAudio.orderAlbum(albums, orderType),
    [albums, orderType]
  );
  const insets = useSafeAreaInsets();

  return (
    <>
      <View className="z-0 " style={{ paddingBottom: insets.bottom }}>
        <List albumVisible={albumVisible} />
      </View>
    </>
  );
}
