import { Pressable, TouchableHighlight } from 'react-native';
import { PlayListIcon, SearchIcon } from '../components/Icons.jsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './(tabs)/index.js';
const Stack = createNativeStackNavigator();
export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Index" component={<Index />} />
    </Stack.Navigator>
  );
}
