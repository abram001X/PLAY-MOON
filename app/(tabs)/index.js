import {  Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '../../components/Main.jsx';
import Plane from '../../components/Plane.jsx';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
 
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        <Main />
      </View>
      <Plane />
     
    </SafeAreaProvider>
  );
}
