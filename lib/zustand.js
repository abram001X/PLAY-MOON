import { create } from 'zustand';

export const useSound = create((set) => ({
  fileAudio: {},
  assets: {},
  albumRandom: [],
  updateAlbumRandom: (album) => set((state) => [album]),
  addSound: (sound) => set((state) => ({ fileAudio: sound })),
  addAudioAssets: (audio) => set((state) => ({ assets: audio }))
}));

/*
audioAssets: {
isRandom: true,
id: album.id,
uri: album.uri,
duration: album.duration,
position: 0,
filename: album.filename,
isPlaying: true
}
*/
