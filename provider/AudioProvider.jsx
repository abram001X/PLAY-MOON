import { createContext, useState } from 'react';
import { handleAudio } from '../lib/audioObject';

export const AudioContext = createContext(null)
export default function AudioProvider ({children}){
    return (
        <AudioContext.Provider value={handleAudio}>
            {children}
        </AudioContext.Provider>
    )
} 