import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';

export function PlayIcon(props) {
  return <AntDesign name="play" size={60} color="white" {...props} />;
}

export function RightIcon(props) {
  return <AntDesign name="stepforward" size={50} color="white" {...props} />;
}

export function LeftIcon(props) {
  return <AntDesign name="stepbackward" size={50} color="white" {...props} />;
}

export function RandomIcon(props) {
  return <FontAwesome name="random" size={22} color="white" {...props} />;
}
export function RepeatIcon(props) {
  return <Feather name="repeat" size={22} color="white" {...props} />;
}

export function PauseIcon(props) {
  return <AntDesign name="pausecircle" size={60} color="white" {...props}/>
}

export function BackIcon(props) {
  return <Ionicons name="arrow-back" size={24} color="black" {...props}/>
}

export function SearchIcon(props) {
  return <Fontisto name="search" size={24} color="black" {...props}/> 

}