import { createContext, useState } from 'react';
export const AudioContext = createContext();
export default function AudioProvider({ children }) {
  const [soundFile, setSoundFile] = useState(null);
  const [isPlay, setIsPlay] = useState(null);
  const [isRandom, setIsRandom] = useState(false);
  const [albums, setAlbums] = useState(null);
  return (
    <AudioContext.Provider
      value={{
        albums,
        setAlbums,
        isRandom,
        setIsRandom,
        isPlay,
        setIsPlay,
        soundFile,
        setSoundFile
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
