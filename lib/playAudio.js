import { Audio } from 'expo-av';

export async function createAudioApp (uri,play=true){ 
  const { sound: soundObject } = await Audio.Sound.createAsync(
    { uri },
    { shouldPlay: play }
  );
  const currentStatus = await soundObject.getStatusAsync();
  return soundObject
};

export async function pauseAudio (fileAudio) {
  await fileAudio.pauseAsync();
};

export async function playAudio (fileAudio) {
  await fileAudio.playAsync();
};