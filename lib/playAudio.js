import { Audio } from 'expo-av';
import { duration } from './duration';
import * as MediaLibrary from 'expo-media-library';

export async function getPermission(permissionResponse, requestPermission) {
  if (permissionResponse) {
    permissionResponse.status !== 'granted' && (await requestPermission());
  }
  const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio',
    first: 200,
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
    { shouldPlay: play }
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

export async function  changeSound(id, list) {
  const num = list[list.indexOf(id) + 1];
  const objectSound = await getSound(num).then((assets) => {
    return {
      sound: assets[0],
      seconds: duration(assets[0].duration),
      num
    };
  });
  return objectSound
}
