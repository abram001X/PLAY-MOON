import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from '../../components/Main.jsx';

export default function Index() {
  
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
        <View style={{ flex: 1 }}>
          <Main/>
        </View>
    </SafeAreaProvider>
  );
}
