import { createContext, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
export const AudioContext = createContext();
export default function AudioProvider({ children }) {
  const [soundObject, setSoundObject] = useState({});
  const [soundList, setSoundList] = useState([]);
  const [audioId, setAudioId] = useState('');
  const [albums, setAlbums] = useState([])
  class HandleAudio {
    constructor() {
      let audioListObject;
      let audioListObjectRandom;
      let isRandom = false;
      this.getPermission = async function (
        permissionResponse,
        requestPermission
      ) {
        if (permissionResponse) {
          permissionResponse.status !== 'granted' &&
            (await requestPermission());
        }
        const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
          mediaType: 'audio',
          first: 200
        });
        return assets;
      };

      this.getSound = async function (fileId) {
        const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
          mediaType: 'audio',
          first: 200
        });
        return assets.filter((obj) => obj.id == fileId);
      };

      this.createAudioApp = async function (uri, play = true) {
        //clearInterval()
        const { sound: soundObject } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: play }
        );
        return soundObject;
      };

      this.pauseAudio = async function () {
        await soundObject.pauseAsync();
      };

      this.playAudio = async function () {
        await soundObject.playAsync();
      };

      this.changeSound = async function (audioId) {
        const num = soundList[soundList.indexOf(audioId) + 1];
        const res = await this.getSound(num);
        const res2 = await this.createAudioApp(res[0].uri);
        return  res2
      };

      this.backSound = async function (audioId) {
        const num = soundList[soundList.indexOf(audioId) - 1];
        const res = await this.getSound(num);
        const res2 = await this.createAudioApp(res[0].uri);
        return res2
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
  const handleAudio = new HandleAudio();
  return (
    <AudioContext.Provider
      value={{
        handleAudio
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
