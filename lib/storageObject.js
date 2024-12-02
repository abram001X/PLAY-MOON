import AsyncStorage from '@react-native-async-storage/async-storage';
class HandleStorage {
  constructor() {
    this.createPlayList = async function (playListName, value) {
      try {
        const playListObject = JSON.stringify({ list: [value] });
        await AsyncStorage.setItem(playListName, playListObject);
        console.log('play created');
      } catch (e) {
        console.log(e);
      }
    };

    this.addMusicPlayList = async function (playListName, value) {
      try {
        const playList = await AsyncStorage.getItem(playListName);
        const jsonPlayList = JSON.parse(playList);
        const music = jsonPlayList.list.push(value);
        const playListObject = JSON.stringify({ list: music });
        await AsyncStorage.setItem(playListName, playListObject);
      } catch (e) {
        console.log(e);
      }
    };

    this.removeMusicPlayList = async function (playListName, value) {
      try {
        const playList = await AsyncStorage.getItem(playListName);
        const jsonPlayList = JSON.parse(playList);
        const music = jsonPlayList.list.filter((obj) => obj !== value);
        const playListObject = JSON.stringify({ list: music });
        await AsyncStorage.setItem(playListName, playListObject);
      } catch (e) {
        console.log(e);
      }
    };

    this.getItems = async function () {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);
        console.log('value', values);
      } catch (e) {
        console.log(e);
      }
    };
  }
}
export const handleStorage = new HandleStorage();
