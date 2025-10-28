import { IconTab } from "@/component/iconTab";
import OverlaySurface from "@/component/overlaySurface";
import { color } from '@/constant/color';
import { useTheme } from "@/context/themeContext";
import { Image, StyleSheet, View, ScrollView } from "react-native"; // Ajoutez ScrollView ici
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from '../component/themedText';
import { useLocalSearchParams } from "expo-router";

export default function Parole() {

  const { theme } = useTheme();
  const styles = getStyle(theme);
  const { parole } = useLocalSearchParams();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color[theme].tint }]}>
      <View style={styles.title}>
       <Image style={{marginLeft:15,borderRadius:8}} source={require("@/assets/images/favicon.png")} width={30} height={30} />
        <ThemedText variant="headline"style={{marginTop:10}} theme={theme}>Tonony</ThemedText>
      </View>

      <OverlaySurface 
        theme={theme} 
        style={styles.hiraBody} 
        elevation={4}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <ThemedText theme={theme} variant="parole" style={styles.paroleText}>
              {parole}
            </ThemedText>
          </ScrollView>
      </OverlaySurface>

      <OverlaySurface 
        theme={theme} 
        style={styles.iconBar} 
        elevation={0}>
          <View style={styles.iconContainer}>
            <IconTab icon="home" tabStyle={styles.tab} path="/" />
            <IconTab icon="book" tabStyle={styles.tab} path="/admin" />
          </View>
      </OverlaySurface>
    </SafeAreaView>
  );
}

const getStyle = (theme: "light" | "dark") => {
  return StyleSheet.create({
    container: {
      flex: 1,
      color: 'white',
    },
    hiraBody: {
      marginTop: 20,
      marginHorizontal:10,
      marginBottom:10,
      paddingVertical: 8,
      backgroundColor: color[theme].fondBody,
      borderRadius: 15,
      flex: 1
    },
    paroleText: {
      textAlign: 'center', 
      padding: 10, 
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    iconBar: {
      backgroundColor: color[theme].tint,
      paddingVertical: 10,
      marginTop: 4,
      borderRadius: 8,
      height: 45,
      paddingTop: 12
    },
    tab: {
      alignItems: 'center',
    }
  });
};
