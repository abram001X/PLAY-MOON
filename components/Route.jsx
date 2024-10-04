import { Button, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './Main.jsx';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Plane } from './Plane.jsx';
import {
  createAudioApp,
  pauseAudio,
  getPermission,
  getSound
} from '../lib/playAudio.js';
import { duration } from '../lib/duration.js';
import { useSound } from '../lib/zustand.js';

export default function Route({ navigation }) {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [albums, setAlbums] = useState();
  const [pages, setPages] = useState(500);
  const [morePages, setMorePages] = useState(true);
  const [loading, setLoading] = useState(true); //pasar a false
  const [reproductor, setReproductor] = useState(false);
  const [fileId, setFileId] = useState(null);
  //const [fileAudio, setFileAudio] = useState(null);
  const [status, setStatus] = useState(true);
  const [fileName, setFileName] = useState(null);
  //const [albumSound, setAlbumSound] = useState([]); //<---ojo
  const [randomMode, setRandomMode] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
  const [listAudio, setListAudio] = useState([]);
  const [positionAudio, setPositionAudio] = useState(0);
  const [minutes, setMinutes] = useState(null);
  const {
    fileAudio,
    assets,
    addAudioAssets,
    updateAlbumSound,
    albumSound,
    updateAlbums
  } = useSound();
  useEffect(() => {
    getPermission(permissionResponse, requestPermission).then((assets) => {
      updateAlbums(assets);
      setAlbums(assets);
      setListAudio(assets);
      updateAlbumSound(
        assets.map((obj) => {
          return parseInt(obj.id);
        })
      );
    });
  }, [permissionResponse, requestPermission]);

  const handlePosition = (range, num) => {
    setMinutes(num);
    setPositionAudio(range);
  };

  const rangeProcess = (file, num) => {
    if (minutes) {
      setInterval(async () => {
        const currentStatus = await file.getStatusAsync();
        if (currentStatus.isPlaying) {
          setPositionAudio(currentStatus.positionMillis / 1000);
        }
      }, 500);
    } else if (num) {
      setInterval(async () => {
        const currentStatus = await file.getStatusAsync();
        if (currentStatus.isPlaying) {
          setPositionAudio(currentStatus.positionMillis / 1000);
        }
      }, 500);
    }
  };

  if (positionAudio >= parseInt(minutes) - 0.5) {
    setPositionAudio(0);
    changeSound(fileId);
  }

  const handleAlbums = (nameAudio) => {
    const name = nameAudio.toLowerCase();
    if (nameAudio) {
      setAlbums(
        listAudio.filter((obj) => obj.filename.toLowerCase().includes(name))
      );
    } else {
      setAlbums(listAudio);
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <Main
          handleAlbums={handleAlbums}
          isSearch={isSearch}
          fileName={fileName}
          albums={albums}
          navigation={navigation}
        />
        {fileName && !reproductor && (
          <Plane
            fileAudio={fileAudio && fileAudio}
            isPlaying={isPlaying}
            status={status}
            fileName={fileName && fileName}
            albumSound={albumSound}
            fileId={parseInt(fileId)}
            changeSound={changeSound}
            handleFile={handleFile}
            positionAudio={positionAudio}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
