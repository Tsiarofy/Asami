import { shadows } from '@/constant/shadow';
import { View, type ViewProps,StyleSheet} from 'react-native';
type props=ViewProps&{
    theme:'light'|'dark'
}

export function Card({style,theme,...rest}:props){
   const getstyle=getStyle(theme);
    return   <View style={[getstyle.card,style]} {...rest}/>
}
const getStyle=(theme:'light'|'dark')=>{
 return(
  StyleSheet.create({
    card:{
        borderRadius:15,
        ...shadows[theme].dp2
    }

})
 )
}

