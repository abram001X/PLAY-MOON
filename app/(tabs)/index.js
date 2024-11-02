import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '../../components/Main.jsx';

import { duration } from '../../lib/duration.js';
import AudioProvider from '../../provider/AudioProvider.jsx';
export default function Index() {
  
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AudioProvider>
        <View style={{ flex: 1 }}>
          <Main/>
        </View>
      </AudioProvider>
    </SafeAreaProvider>
  );
}
