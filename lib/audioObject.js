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
    let isRandom = false;
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
      soundList = assets;
      audioListObject = assets.filter((obj) => obj.id == fileId);
      return audioListObject;
    };

    this.createAudioApp = async function (uri, play = true) {
      //clearInterval()
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

    this.changeSound = async function (audioId) {
      const num = soundList[soundList.indexOf(audioId) + 1];
      console.log(num)
      const res = await this.getSound(num.id);
      const resSound = await this.createAudioApp(res[0].uri);
      return resSound;
    };

    this.backSound = async function (audioId) {
      const num = soundList[soundList.indexOf(audioId) - 1];
      const res = await this.getSound(num);
      const resSound = await this.createAudioApp(res[0].uri);
      return resSound;
    };

    this.handlePosition = async function (params) {};

    this.randomList = async function () {
      if (isRandom) {
        audioListObjectRandom = audioListObjectRandom.sort(
          () => Math.random() - 0.5
        );
        isRandom = true;
        return true;
      } else {
        audioListObjectRandom = audioListObjectRandom.sort((a, b) => a - b);
        isRandom = false;
        return false;
      }
    };
  }
}
export const handleAudio = new HandleAudio();
