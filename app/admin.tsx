import OverlaySurface from "@/component/overlaySurface";
import {Card}  from "@/component/card";
import { color } from '@/constant/color';
import { shadows } from "@/constant/shadow";
import { Image,StyleSheet, TextInput, View,Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from '../component/themedText';
import {IconTab}  from "@/component/iconTab";
import {SwitchBoutton }  from "@/component/Swicth";
import { useTheme } from "../context/themeContext";
import {Feather} from '@expo/vector-icons';
import {useState}  from 'react';
import { Href, router } from "expo-router";

export default function Parole() {
  const {theme}=useTheme();
  const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false);
  const styles=getStyle(theme);
  const handlePassword=(text : string)=>{
        if(text === 'ASAMIadmin'){
          setIsAuthenticated(true);
        }
  }
  const navigate=(path:Href)=>{
          router.push(path);
  }



  if(isAuthenticated){
    return(
         <SafeAreaView style={[styles.container,{backgroundColor:color[theme].tint}]}>
      <View style={styles.title}>
       <Image style={{marginLeft:15,borderRadius:8}} source={require("@/assets/images/favicon.png")} width={30} height={30} />
        <ThemedText variant="headline" theme={theme}>Espace admin</ThemedText>
      </View>

        <OverlaySurface theme={theme} style={styles.hiraBody} elevation={4}>
          <View style={{justifyContent:'center',alignItems:'center',marginTop:5,marginBottom:20}}>
            <ThemedText theme={theme} variant="suppressionText">Veuiller cliquer sur l&apos;action à effectuer</ThemedText>
          <View style={{marginTop:20}}>
            <Card style={[styles.body]} theme={theme} >
               <Pressable style={styles.navigation} onPress={()=>navigate('/ajout')}>
                <ThemedText theme={theme} variant="adminText"> ajouter des chansons</ThemedText>
                 <Feather name="chevron-right" size={20} color="black" />
                </Pressable>
              
            </Card>
            <Card style={[styles.body]} theme={theme}>
               <Pressable  style={styles.navigation}  onPress={()=>navigate('/suppression')}>
                <ThemedText theme={theme} variant="adminText">supprimer des chansons</ThemedText> 
                <Feather name="chevron-right" size={20} color="black" />
                </Pressable>
            
            </Card>
            </View>
          </View>
        </OverlaySurface>

 
  <OverlaySurface theme={theme} style={styles.iconBar} elevation={0}>
    <View style={styles.iconContainer}>
        <IconTab icon="home" tabStyle={styles.tab} path="/" />
        <IconTab icon="book" tabStyle={styles.tab}/>
     </View>
  </OverlaySurface>

  </SafeAreaView> 
  )
  }else{
      return (
 
    <SafeAreaView style={[styles.container,{backgroundColor:color[theme].tint}]}>
      <View style={styles.title}>
<Image style={{marginLeft:15,borderRadius:8}} source={require("@/assets/images/favicon.png")} width={30} height={30} />
        <ThemedText variant="headline" theme={theme}>Espace admin</ThemedText>

      </View>

           <View style={styles.switchStyle}>
              <ThemedText  variant="adminText" theme={theme}>Activer ou desactiver le mode sombre</ThemedText>
              <SwitchBoutton  />
          </View>
        
   


          <OverlaySurface theme={theme} style={styles.hiraBody} elevation={6}>
            <View>
              <Card style={styles.body} theme={theme}>
                <ThemedText variant="normal" theme={theme}>
                   Bienvenue dans l&apos;espace admin,
                   pour pouvoir accéder au fonctionnalité
                   d&apos;ajout et de suppression de chanson
                   vous devez entrer le mot de passe
                   si vous n&apos;en avez pas veuillez 
                   en informer le responsable
                    </ThemedText>
              </Card>
              <OverlaySurface theme={theme} style={styles.input} elevation={2}>
                 <View style={{height:60}}>
                  <TextInput style={{height:60,width:300}} onChangeText={handlePassword} placeholder="Entrer le mot de passe"/>
                  </View>
              </OverlaySurface>
            </View>
          </OverlaySurface>


  <OverlaySurface theme={theme} style={styles.iconBar} elevation={0}>
    <View style={styles.iconContainer}>
       <IconTab icon="home" tabStyle={styles.tab} path="/" />
       <IconTab icon="book" tabStyle={styles.tab}/>
    </View>
  </OverlaySurface>

  </SafeAreaView>

  
  );
  }

}
const getStyle=(theme:'light'|'dark')=>{
  return(
    StyleSheet.create({
      container:{
        flex:1
      },
      hiraBody:{
        marginTop:4,
        marginHorizontal:2,
        paddingVertical:8,
        backgroundColor:color[theme].fondBody,
        borderRadius:15,
        alignItems:'center',
        flex:1
      },
        body: {
          backgroundColor: color[theme].activeCategory,
          height: 108,
          width:300,
           padding: 9,
          borderRadius: 15, 
          gap: 2,
          marginLeft: 10, marginRight: 10,
           marginTop: 4,
          ...shadows[theme].dp2,
          justifyContent:'center',
          alignItems:'center',
          borderColor:color[theme].fondBorder,
          borderWidth:0.5,

  },
  navigation:{
          flexDirection: 'row',
          justifyContent:"space-evenly",
          height: 90,
          width:300,
          // backgroundColor:'black',
          alignItems:"center"
  },
    header: {
      width: 80,
      height: 30,
      margin: 10,
      backgroundColor: color[theme].fondCardList,
      borderRadius: 12,
      ...shadows[theme].dp1
    },
    switchStyle:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      backgroundColor: color[theme].tint,
      borderRadius:8,
      borderColor:'#FFF',
      borderWidth:0.5,
      margin:10,
    },
       title:{
        flexDirection:'row',
        alignItems:'center'
      },
      iconContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      iconBar:{
        backgroundColor: color[theme].tint,
        paddingVertical:10,
        marginTop:4,
        borderRadius:8,
        height:45,
        paddingTop:12
      },
      input : {
    backgroundColor: color[theme].fondCardList,
    height: 60,
    marginVertical: 30,
    // paddingHorizontal: 10,
    marginHorizontal:10,
    borderRadius: 8,
    justifyContent:'center',
    },
    actionContainer:{
          backgroundColor: color[theme].fondCardList,
          borderBlockColor:'white',
          height: 120,
           padding: 9,
          borderRadius: 15, 
          gap: 16,
          marginLeft: 10, marginRight: 10,
           marginTop: 12,
          ...shadows[theme].dp2
    },
      tab: {
        alignItems: 'center',
      }
    })
  )
 
}