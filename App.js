import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.contPadre}>
    </View>
);
}
const styles = StyleSheet.create({
contPadre:{
  flex: 1,
  backgroundColor: "#000",
  alignItems: "center",
  justifyContent: "center",
},
})
