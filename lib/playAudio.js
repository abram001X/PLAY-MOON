import { Audio } from 'expo-av';
import { duration } from './duration';
import * as MediaLibrary from 'expo-media-library';

export async function getPermission(permissionResponse, requestPermission) {
  if (permissionResponse) {
    permissionResponse.status !== 'granted' && (await requestPermission());
  }
  const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio',
    first: 200
  });
  return assets;
}

export async function getSound(fileId) {
  const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio',
    first: 200
  });
  return assets.filter((obj) => obj.id == fileId);
}

export async function createAudioApp(uri, play = true) {
  const { sound: soundObject } = await Audio.Sound.createAsync( 
    { uri },
    { shouldPlay: true }
  );

  const currentStatus = await soundObject.getStatusAsync();
  return soundObject;
}

export async function pauseAudio(fileAudio) {
  await fileAudio.pauseAsync();
}

export async function playAudio(fileAudio) {
  await fileAudio.playAsync();
}
export const changeSound = async (id, albums, albumSound) => {
  //clearInterval();
  //setPositionAudio(0);
  const num = albumSound[albumSound.indexOf(id) + 1];
  const arrayUri = albums.filter((obj) => obj.id == num);
  return {
    num,
    arrayUri
  };
};
export const backSound = async (id, albums, albumSound) => {
  const num = albumSound[albumSound.indexOf(id) - 1];
  const arrayUri = albums.filter((obj) => obj.id == num);
  return {
    num,
    arrayUri
  };
};
export const updatePositionSound = async (positionAudio) => {
  const positionSound = await fileAudio.setPositionAsync(positionAudio * 1000);
  const position = (await positionSound.positionMillis) / 1000;
  return {
    position
  };
};

export const randomList = (isRandom) => {
  if (isRandom) {
    return {
      albumRandom: albumSound.sort(() => Math.random() - 0.5),
      isRandom: true
    };
  } else {
    return {
      albumRandom: albumSound.sort((a, b) => a - b),
      isRandom: false
    };
  }
};
