import { Audio } from 'expo-av';
import { duration } from './duration';
import * as MediaLibrary from 'expo-media-library';

class HandleAudio {
  constructor() {
    let audioListId;
    let soundList;
    let audioId;
    let sound;
    let audioListObject;
    let audioListObjectRandom;
    this.getPermission = async function (
      permissionResponse,
      requestPermission
    ) {
      if (permissionResponse) {
        permissionResponse.status !== 'granted' && (await requestPermission());
      }
      const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 200
      });
      soundList = assets;
      return soundList;
    };

    this.getSound = async function (fileId) {
      const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 200
      });
      audioListObject = assets.filter((obj) => obj.id == fileId);
      return audioListObject;
    };

    this.createAudioApp = async function (uri, play = true) {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: play }
      );
      // const currentStatus = await soundObject.getStatusAsync();
      sound = soundObject;
      return sound;
    };

    this.pauseAudio = async function () {
      await sound.pauseAsync();
    };

    this.playAudio = async function () {
      await sound.playAsync();
    };

    this.changeSound = async function () {
      const num = soundList[soundList.indexOf(audioId) + 1];
      const res = await this.getSound(num);
      this.createAudioApp(res[0].uri);
    };

    this.changeSoundBack = async function (params) {
      const num = soundList[soundList.indexOf(audioId) - 1];
      const res = await this.getSound(num);
      this.createAudioApp(res[0].uri);
    };

    this.handlePosition = async function (params) {};

    this.randomList = async function (isRandom) {
      if (isRandom) {
        audioListObjectRandom = audioListObjectRandom.sort(
          () => Math.random() - 0.5
        );
        return true;
      } else {
        audioListObjectRandom = audioListObjectRandom.sort((a, b) => a - b);
        return false;
      }
    };
  }
}
export const handleAudio = new HandleAudio();
