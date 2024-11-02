import { useLocalSearchParams } from 'expo-router';
import Reproductor from '../components/Reproductor';
import AudioProvider from '../provider/AudioProvider';

export default function Interfaz(){
    const {id} = useLocalSearchParams()
    return <AudioProvider>
        <Reproductor id={id}/>
    </AudioProvider>
}