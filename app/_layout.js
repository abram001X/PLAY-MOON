import { Stack, Link } from 'expo-router';
import { Pressable, TouchableHighlight } from 'react-native';
import { PlayListIcon, SearchIcon } from '../components/Icons';
import AudioProvider from '../provider/AudioProvider';
export default function Layout() {
  return (
    <AudioProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ddd' },
          headerTitle: 'PLAYMOON',
          headerRight: () => (
            <Link asChild href="/playlist">
              <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="#999"
                className="p-5"
                style={{ borderRadius: 50 }}
              >
                <PlayListIcon />
              </TouchableHighlight>
            </Link>
          )
        }}
      />
    </AudioProvider>
  );
}
