import { Audio } from 'expo-av';
import { duration } from './duration';
import * as MediaLibrary from 'expo-media-library';

class HandleAudio {
  constructor() {
    let audioListObject;
    let audioListObjectRandom;
    let isRandom = false;
    this.list = [];
    this.soundObject = {}
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
      this.list = assets;
      return assets;
    };

    this.getSound = async function (albums, audioId) {
      return albums.filter((obj) => obj.id == audioId);
    };

    this.createAudioApp = async function (uri, play = true) {
      //clearInterval()
      const { sound: soundObject } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: play }
      );
      this.soundObject = soundObject
      return soundObject;
    };

    this.pauseAudio = async function () {
      await this.soundObject.pauseAsync();
    };

    this.playAudio = async function () {
      await this.soundObject.playAsync();
    };

    this.changeSound = async function (soundList, audioId, albums) {
      const num = soundList[soundList.indexOf(audioId) + 1];
      const res = await this.getSound(albums, num);
      const res2 = await this.createAudioApp(res[0].uri);
      return { res, res2 };
    };

    this.backSound = async function (soundList, audioId, albums) {
      const num = soundList[soundList.indexOf(audioId) - 1];
      const res = await this.getSound(albums, num);
      const res2 = await this.createAudioApp(res[0].uri);
      return { res, res2 };
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
