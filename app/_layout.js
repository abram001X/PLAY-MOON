import { Pressable, TouchableHighlight } from 'react-native';
import { PlayListIcon, SearchIcon } from '../components/Icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../components/Main';

const Stack = createNativeStackNavigator()
export default function Layout() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Main}/>
        <Stack.Screen name="Reproductor" component={Reproductor}/>
      </Stack.Navigator>
    </NavigationContainer>
  )  
}
