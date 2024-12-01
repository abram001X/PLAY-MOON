import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import LogoPro from '../assets/logoSimple.jpeg';
import { duration } from '../lib/duration';
import { router } from 'expo-router';
import { handleAudio } from '../lib/audioObject';
import { MenuIconVertical } from './Icons';
import { TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
export default function Musics({ album }) {
  const create = async () => {
    await handleAudio.createAudioApp(album.uri, parseInt(album.id), true);
    const res = await handleAudio.getObject();
    if (res.getStatusAsync()) router.navigate('/true');
  };
  return (
    <>
      <View key={album.id} className="flex-row  p-2 pl-0">
        <Image source={LogoPro} style={styles.img} />
        <View className="flex-shrink w-full">
          <Text className="text-white ml-2 h-4">{album.filename} </Text>
          <Text className="text-slate-200 ml-2 mt-3">
            {duration(parseFloat(album.duration))}{' '}
          </Text>
        </View>
        <View className="justify-center">
          <TouchableHighlight
            className="rounded-full"
            activeOpacity={0.6}
            underlayColor="#aaa"
            onPress={() => ''}
          >
            <MenuIconVertical size={19} className="p-1" />
          </TouchableHighlight>
        </View>
      </View>
      <Modal>
        
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 7
  }
});
