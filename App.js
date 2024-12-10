import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AudioProvider from './provider/AudioProvider.jsx';
import { PlayListIcon, SearchIcon } from './components/Icons.jsx';
import Playlist from './app/Playlist.jsx';
import Search from './app/Search.jsx';
import Reproductor from './app/reproductor/Reproductor.jsx';
import InPlayList from './app/playlist/InPlayList.jsx';
import TabsLayout from './app/(tabs)/_layout.js';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </AudioProvider>
  );
}

function Layout() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'PLAYMOON',
          headerRight: () => (
            <>
              <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="#999"
                className="p-5"
                style={{ borderRadius: 50 }}
                onPress={() => navigation.navigate('Playlist')}
              >
                <PlayListIcon />
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="#999"
                className="p-5"
                style={{ borderRadius: 50 }}
                onPress={() => navigation.navigate('Search')}
              >
                <SearchIcon fontSize={15} />
              </TouchableHighlight>
            </>
          )
        }}
        name="Home"
        component={TabsLayout}
      />
      <Stack.Screen name="Reproductor" component={Reproductor} />
      <Stack.Screen name="Playlist" component={Playlist} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="InPlayList" component={InPlayList} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  contPadre: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
