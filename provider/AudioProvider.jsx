import { createContext, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
export const AudioContext = createContext();
export default function AudioProvider({ children }) {
  const [soundObject, setSoundObject] = useState({});
  const [soundList, setSoundList] = useState([]);
  const [audioId, setAudioId] = useState('');
  const [albums, setAlbums] = useState([]);
  const [sound, setSound] = useState(null)
  
  return (
    <AudioContext.Provider
      value={{
        setAlbums,
        setAudioId,
        albums,
        audioId,
        setSoundList,
        soundList
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
