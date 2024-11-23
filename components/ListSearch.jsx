import { useState } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';

export default function ListSearch({ list, fetchingDownload }) {
  return (
    <View className="flex-row p-2">
      <Image
        source={{ uri: list.thumbnail && list.thumbnail[0].url }}
        style={{ width: 150, height: 100, borderRadius: 10 }}
      />
      <View className="ml-2 flex-shrink w-full">
        <Text className="text-white text-sm max-h-9">{list.title} </Text>
        <View className="flex-row">
          <Text className="text-slate-200">{list.channelTitle} </Text>
          <Text className="text-slate-200 ml-4">
            °{list.publishedTimeText}{' '}
          </Text>
        </View>
        <TouchableHighlight
          className="w-20 self-end rounded-xl"
          activeOpacity={0.6}
          underlayColor="#333"
          onPress={() => {
            fetchingDownload(list.videoId);
          }}
        >
          <Text className="text-yellow-300 text-base text-center">Descargar </Text>
        </TouchableHighlight>
        <View className="">
          <Text className="text-slate-200">{list.lengthText} </Text>
        </View>
      </View>
    </View>
  );
}
