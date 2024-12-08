import { Text, TextInput, TouchableHighlight, View } from 'react-native';

export default function ChangePlaylist({
  setPlayListName,
  setIsMenuOpen,
  handleList
}) {
  return (
    <View className="p-3 rounded-md w-80 bg-black">
      <Text className="mb-4 text-white border-b border-b-white p-1">
        Nombre de tu nueva playlist
      </Text>
      <TextInput
        className="p-2 text-black bg-white mt-2"
        placeholder="Nombre"
        onChangeText={(text) => {
          setPlayListName(text);
        }}
      />
      <TouchableHighlight
        className="rounded-md"
        activeOpacity={0.8}
        underlayColor={'#666'}
        onPress={() => {
          handleList();
          setIsMenuOpen(false);
        }}
      >
        <Text className="text-white mt-4 p-2 bg-slate-500 rounded w-16 text-center self-center">
          Crear{' '}
        </Text>
      </TouchableHighlight>
    </View>
  );
}
