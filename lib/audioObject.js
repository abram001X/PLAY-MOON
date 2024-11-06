import { Audio } from 'expo-av';
import { duration } from './duration';
import * as MediaLibrary from 'expo-media-library';

class HandleAudio {
  constructor() {
    let audioListObject;
    let audioListObjectRandom;
    let isRandom = false;
    this.listAudio = [];
    this.listId = [];
    this.soundObject = {};
    this.audioId = '';
    this.position = 0;

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
      this.listAudio = assets;
      this.listId = assets.map((obj) => {
        return parseInt(obj.id);
      });
      return assets;
    };

    this.getSound = async function () {
      return this.listAudio.filter((obj) => obj.id == this.audioId);
    };

    this.createAudioApp = async function (uri, id = null, play = true) {
      //clearInterval()
      this.audioId = !id ? this.audioId : id;
      const { sound: soundObject } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: play }
      );
      this.soundObject = soundObject;
      return soundObject;
    };

    this.getObject = async function () {
      return this.soundObject;
    };

    this.pauseAudio = async function () {
      await this.soundObject.pauseAsync();
    };

    this.playAudio = async function () {
      await this.soundObject.playAsync();
    };

    this.changeSound = async function () {
      const num = this.listId[this.listId.indexOf(this.audioId) + 1];
      this.audioId = this.audioId + 1;
      const res = await this.getSound(num);
      await this.createAudioApp(res[0].uri)
    };

    this.backSound = async function () {
      const num = this.listId[this.listId.indexOf(this.audioId) - 1];
      this.audioId = this.audioId - 1;
      const res = await this.getSound(num);
      await this.createAudioApp(res[0].uri);
    };

    this.handlePosition = async function (value) {
      await this.soundObject.setPositionAsync(value);
    };

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
