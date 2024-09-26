import { Tabs } from 'expo-router';
import { DownloadIcon, MusicIcon, PlayListIcon } from '../../components/Icons';

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: '#ddd'}
        }}>
            <Tabs.Screen name='index'
            options={{
                title: 'PlayMoon',
                tabBarIcon: ({color})=> <MusicIcon color={color}/>
            }}/>
            <Tabs.Screen name='download'
            options={{
                title: 'Download',
                tabBarIcon: ({color})=> <DownloadIcon color={color}/>
            }}/>
        </Tabs>
    )
}