import { color } from '@/constant/color';
import { Link } from 'expo-router';
import { Pressable, View, type ViewProps,StyleSheet} from 'react-native';
import { ThemedText } from './themedText';

type ParoleProps=ViewProps&{
    parole:string,
    titre:string,
    theme:"light"|"dark"
}
export function ParoleCard({style,parole,titre,theme,...rest}:ParoleProps){
return(
    <Link href={{pathname:'./parole',params:{parole:parole}}} asChild >
         <Pressable android_ripple={{color:color[theme].fondBody,foreground:false}} >
         <View style={[style,styles.container]}>
            <ThemedText variant="normal" theme={theme}>{titre}</ThemedText>
        </View>  
         </Pressable>
    </Link>
  
  
)
}
const styles=StyleSheet.create({
   container:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:2
   } 
})