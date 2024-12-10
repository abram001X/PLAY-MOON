import Index from './index.js';
import Download from './Download';
import { DownloadIcon, MusicIcon, PlayListIcon } from '../../components/Icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();
export default function TabsLayout() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#ddd' }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'PlayMoon',
          tabBarIcon: ({ color }) => <MusicIcon color={color} />
        }}
        component={Index}
      />
      <Tabs.Screen
        name="Download"
        options={{
          title: 'Download',
          tabBarIcon: ({ color }) => <DownloadIcon color={color} />
        }}
        component={Download}
      />
    </Tabs.Navigator>
  );
}
