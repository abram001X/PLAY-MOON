import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Route from './components/Route';
import Reproductor from './components/Reproductor';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator initiallRouteName="Home">
        <Stack.Screen name="Home" component={Route}/>
        <Stack.Screen name="Reproductor" component={Reproductor}/>
      </Stack.Navigator>
    </NavigationContainer>
);
}
const styles = StyleSheet.create({
contPadre:{
},
})
