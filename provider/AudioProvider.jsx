import { createContext, useEffect, useRef, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import { handleAudio } from '../lib/audioObject';
export const AudioContext = createContext();
export default function AudioProvider({ children }) {
  const [soundFile, setSoundFile] = useState(null);
  const [isPlay, setIsPlay] = useState(null);
  const [position, setPosition] = useState(0);
  const intervalRef = useRef(null);

  return (
    <AudioContext.Provider
      value={{
        intervalRef,
        position,
        setPosition,
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
