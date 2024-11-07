import { createContext, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
export const AudioContext = createContext();
export default function AudioProvider({ children }) {
  const [sound, setSound] = useState(null)
  
  return (
    <AudioContext.Provider
      value={{
        
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
