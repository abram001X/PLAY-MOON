import { Audio } from 'expo-av';

export async function playAudio(soundUri, pauseOrPlay) {
  const { sound } = await Audio.Sound.createAsync({
    uri: soundUri
  });
  if (pauseOrPlay) {
    await sound.playAsync();
  } else {
    await sound.pauseAsync();
  }
}
