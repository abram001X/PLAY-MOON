import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import {
  orderDateAsc,
  orderDateDesc,
  orderDuration,
  orderTitle
} from './orderAlbums';
Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  playsInSilentModeIOS: true,
  interruptionModeIOS: InterruptionModeIOS.DuckOthers,
  interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: true
});
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
        first: 50
      });

      const arrayOrder = this.orderAlbum(assets, 'fecha desc');
      this.listAudio = arrayOrder;
      this.listId = arrayOrder.map((obj) => {
        return parseInt(obj.id);
      });
      return arrayOrder;
    };

    this.getSound = async function () {
      return this.listAudio.filter((obj) => obj.id == this.audioId);
    };

    this.createAudioApp = async function (
      uri,
      id = null,
      play = true,
      list = false
    ) {
      if (list) {
        this.listId = list.map((obj) => {
          return parseInt(obj.id);
        });
      }

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
      await this.soundObject.playAsync({ staysActiveInBackground: true });
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
        this.listId = this.listAudio.map((obj) => {
          return parseInt(obj.id);
        });
        this.isRandom = false;
        return false;
      }
    };
    this.orderAlbum = function (albums, orderType) {
      const list = [...albums];
      if (orderType == 'fecha desc') {
        list.sort(orderDateDesc);
      }
      if (orderType == 'fecha asc') {
        list.sort(orderDateAsc);
      }
      if (orderType == 'titulo') {
        list.sort(orderTitle);
      }
      if (orderType == 'duration') {
        list.sort(orderDuration);
      }
      this.listAudio = list;
      return list;
    };
    this.removeAssets = async function (assets) {
      try {
        const deleteAsset = await MediaLibrary.deleteAssetsAsync(assets);
        console.log(deleteAsset);
      } catch (e) {
        console.log(e.message);
      }
    };
  }
}

export const handleAudio = new HandleAudio();
