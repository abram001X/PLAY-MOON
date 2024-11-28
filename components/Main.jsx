import { useContext, useEffect, useState } from 'react';

import * as MediaLibrary from 'expo-media-library';
import { handleAudio } from '../lib/audioObject.js';
import orderDate, { orderDuration, orderTitle } from '../lib/orderAlbums.js';
import Home from './Home.jsx';
export default function Main() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState(null);
  useEffect(() => {
    handleAudio
      .getPermission(permissionResponse, requestPermission)
      .then((assets) => {
        setAlbums(assets);
        console.log(assets[0]);
      });
  }, [permissionResponse, requestPermission]);
  const orderAlbum = (orderType) => {
    const list = [...albums];
    if (orderType == 'fecha') {
      list.sort(orderDate);
    }
    if (orderType == 'titulo') {
      list.sort(orderTitle);
    }
    if (orderType == 'duration') {
      list.sort(orderDuration);
    }
    setAlbums(list);
  };
  return (
    <>
      <Home albums={albums} orderAlbum={orderAlbum} />
    </>
  );
}
