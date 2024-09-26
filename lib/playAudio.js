import { Audio } from 'expo-av';
import { getSound } from './files';
import { duration } from './duration';
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
