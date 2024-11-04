import { create } from 'zustand';

export const useSound = create((set) => ({
  soundObject: {},
  audioId: '',
  setSoundObject: (newSound) => set(() => ({ soundObject: newSound })),
  setAudioId: (newId) => set(()=>  ({audioId: newId})),

}));
