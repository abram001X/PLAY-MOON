import { createContext, useState } from 'react';
export const AudioContext = createContext();
export default function AudioProvider({ children }) {
  const [sound, setSound] = useState(null);
  const [isPlay, setIsPlay] = useState(null);
  const [isRandom, setIsRandom] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [position, setPosition] = useState(0);
  return (
    <AudioContext.Provider
      value={{
        position,
        setPosition,
        albums,
        setAlbums,
        isRandom,
        setIsRandom,
        isPlay,
        setIsPlay,
        sound,
        setSound
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
