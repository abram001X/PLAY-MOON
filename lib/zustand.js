import { create } from 'zustand';

export const useSound = create((set) => ({
  fileAudio: {},
  assets: {},
  albumSound: [],
  albums: [],
  updateAlbums: (item) => set((state) => ({ albums: item })),
  updateAlbumSound: (album) => set((state) => ({ albumSound: album })),
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
