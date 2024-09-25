import { Pressable, Text, View } from 'react-native';
import { PlayIcon, PauseIcon } from './Icons';
import { TouchableHighlight } from 'react-native';
import { pauseAudio, playAudio } from '../lib/playAudio';
export function Plane({ fileAudio, isPlaying, status }) {
  return (
    <View className="flex-row bg-white fixed z-50">
      <Pressable
        onPress={() => {
          if(status){
            isPlaying(false)
            playAudio(fileAudio)
          }else{
            isPlaying(true)
            pauseAudio(fileAudio)
          }
         
        }}
      >
        {!status ? (
          <PauseIcon color={'000'} />
        ) : (
          <PlayIcon color={'000'} />
        )}
      </Pressable>
    </View>
  );
}
