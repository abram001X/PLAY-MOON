import { Audio } from 'expo-av';
import { duration } from './duration';
import * as MediaLibrary from 'expo-media-library';

class HandleAudio {
  constructor() {
    let soundList;
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
      return assets.filter((obj) => obj.id == fileId);
    };

    this.createAudioApp = async function (uri,  play = true) {
      //clearInterval()
      const { sound: soundObject } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: play }
      );
      return soundObject;
    };

    this.pauseAudio = async function (sound) {
      console.log(sound)
      await sound.pauseAsync();
    };

    this.playAudio = async function (sound) {
      console.log(sound)
      await sound.playAsync();
    };

    this.changeSound = async function (audioId) {
      const num = soundList[soundList.indexOf(audioId) + 1];
      console.log(num);
      const res = await this.getSound(num.id);
      const res2 = await this.createAudioApp(res[0].uri);
      return {res2,res};
    };

    this.backSound = async function (audioId) {
      const num = soundList[soundList.indexOf(audioId) - 1];
      const res = await this.getSound(num);
      const res2 = await this.createAudioApp(res[0].uri);
      return {res2,res};
    };

    this.handlePosition = async function () {};

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
