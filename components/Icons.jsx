import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export function PlayIcon(props) {
  return <FontAwesome name="play" size={40} color="white" {...props} />;
}

export function RightIcon(props) {
  return <AntDesign name="stepforward" size={40} color="white" {...props} />;
}

export function LeftIcon(props) {
  return <AntDesign name="stepbackward" size={40} color="white" {...props} />;
}

export function RandomIcon(props) {
  return <FontAwesome name="random" size={22} color="white" {...props} />;
}
export function RepeatIcon(props) {
  return <Feather name="repeat" size={22} color="white" {...props} />;
}

export function PauseIcon(props) {
  return <FontAwesome name="pause" size={40} color="white" {...props} />;
}

export function BackIcon(props) {
  return <Ionicons name="arrow-back" size={24} color="black" {...props} />;
}

export function SearchIcon(props) {
  return <Fontisto name="search" size={24} color="black" {...props} />;
}

export function MusicIcon(props) {
  return <MaterialIcons name="music-note" size={24} color="black" {...props} />;
}

export function DownloadIcon(props) {
  return <Fontisto name="download" size={24} color="black" {...props} />;
}
export function PlayListIcon(props) {
  return (
    <MaterialCommunityIcons
      name="playlist-music"
      size={24}
      color="black"
      {...props}
    />
  );
}

export function ClearIcon(props) {
  return <FontAwesome6 name="xmark" {...props} size={24} color="black" />;
}

export function OrderIcon(props) {
  return <FontAwesome name="sort-alpha-asc" size={24} {...props} color="black" />
}

export function MenuIconVertical(props) {
  return <SimpleLineIcons name="options-vertical" size={24} {...props} color="white" />
}
