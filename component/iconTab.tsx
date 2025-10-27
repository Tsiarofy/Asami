import { type ViewProps, TouchableOpacity, type ViewStyle } from 'react-native';
// @ts-ignore: no type declarations for react-native-vector-icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Link, type Href } from 'expo-router';
type props=ViewProps&{
    icon:string,
    tabStyle?: ViewStyle,
    path?:Href
}
export function IconTab({icon,tabStyle,path}:props){
    if(path===undefined){
        return(
            <TouchableOpacity style={tabStyle}> 
            <AntDesign name={icon} size={20} color="#2196F3" />
           </TouchableOpacity>
        )
    }
    return(
        <Link href={{pathname:path,params:{id:icon}}} asChild>
        <TouchableOpacity style={tabStyle}>
        <AntDesign name={icon} size={20} color="#2196F3" />
         {/*#f45a27*/}
       </TouchableOpacity>
       </Link>
    )
}