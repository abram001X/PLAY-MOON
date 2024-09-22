import * as MediaLibrary from 'expo-media-library';
export async function getPermission(permissionResponse, requestPermission) {
  if (permissionResponse) {
    permissionResponse.status !== 'granted' && (await requestPermission());
  }
  const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio',
    first: 15,

  });
  return assets;
}

export async function getSound(fileId) {
  const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
    mediaType: 'audio',
    
  });
  return assets.filter((obj) => obj.id == fileId);
}
