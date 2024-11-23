import { ImageBackground, StyleSheet, View } from 'react-native';

export default function playlist() {
  return (
    <ImageBackground
      source={require('../assets/fondo.jpeg')}
      className="flex-1"
      style={styles.imgBack}
    >
      <View className="flex-1"></View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imgBack: {
    flex: 1
  }
});
