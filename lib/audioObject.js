import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
class HandleAudio {
  constructor() {
    this.isRandom = false;
    this.listAudio = [];
    this.listId = [];
    this.soundObject = null;
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
        first: 470
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
      if (this.soundObject) await this.pauseAudio();
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
      await this.pauseAudio();
      const num = this.listId[this.listId.indexOf(this.audioId) + 1];
      this.audioId = parseInt(num);
      const res = await this.getSound(num);
      await this.createAudioApp(res[0].uri);
    };

    this.backSound = async function () {
      await this.pauseAudio();
      const num = this.listId[this.listId.indexOf(this.audioId) - 1];
      this.audioId = parseInt(num);
      const res = await this.getSound(num);
      await this.createAudioApp(res[0].uri);
    };

    this.handlePosition = async function (value) {
      await this.soundObject.setPositionAsync(value);
    };

    this.rangeProccess = async function () {
      let object = await this.soundObject.getStatusAsync();
      return object.positionMillis / 1000;
    };

    this.handleListRandom = async function () {
      if (!this.isRandom) {
        this.listId = this.listId.sort(() => Math.random() - 0.5);
        this.isRandom = true;
        return true;
      } else {
        this.listId = this.listId.sort((a, b) => a - b);
        this.isRandom = false;
        return false;
      }
    };
  }
}
export const handleAudio = new HandleAudio();
