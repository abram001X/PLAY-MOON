import AsyncStorage from '@react-native-async-storage/async-storage';

class HandleStorage {
  constructor() {
    this.createPlayList = async function (playListName, value) {
      try {
        const playListObject = JSON.stringify({
          musicsCount: 0,
          name: playListName,
          musicList: [value]
        });
        await AsyncStorage.setItem(playListName, playListObject);
        console.log('playlst created');
        return await this.getItems();
      } catch (e) {
        console.log(e);
      }
    };

    this.addMusicPlayList = async function (playListName, value, count) {
      try {
        const playList = await AsyncStorage.getItem(playListName);
        const jsonPlayList = JSON.parse(playList);
        const music = jsonPlayList.musicList.push(value);
        const playListObject = JSON.stringify({
          ...jsonPlayList,
          musicsCount: jsonPlayList.musicsCount + count,
          musicList: music
        });
        await AsyncStorage.setItem(playListName, playListObject);
      } catch (e) {
        console.log(e);
      }
    };

    this.removeMusicPlayList = async function (playListName, value) {
      try {
        const playList = await AsyncStorage.getItem(playListName);
        const jsonPlayList = JSON.parse(playList);
        const music = jsonPlayList.musicList.filter((obj) => obj !== value);
        const playListObject = JSON.stringify({
          ...jsonPlayList,
          musicList: music
        });
        await AsyncStorage.setItem(playListName, playListObject);
      } catch (e) {
        console.log(e);
      }
    };
    this.getItem = async function (key) {
      try {
        const value = await AsyncStorage.getItem(key);
        return JSON.parse(value);
      } catch (e) {
        console.log(e);
      }
    };

    this.getItems = async function () {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        const listValues = values.map((obj) => {
          const json = JSON.parse(obj[1]);
          return json;
        });
        console.log('value', listValues);
        return listValues;
      } catch (e) {
        console.log(e);
      }
    };

    this.clearStorage = async function () {
      try {
        await AsyncStorage.clear();
        console.log('playList eliminados');
      } catch (e) {
        console.log(e);
      }
    };
  }
}
export const handleStorage = new HandleStorage();
