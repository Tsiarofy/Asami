import OverlaySurface from "@/component/overlaySurface";
import { color } from '@/constant/color';
import { shadows } from "@/constant/shadow";
import { useEffect, useState, useMemo, useRef } from 'react';
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons,EvilIcons  } from '@expo/vector-icons';
import { SearchBar } from '../component/searchBare';
import { ThemedText } from '../component/themedText';
import { Card } from '../component/card';
import { IconTab } from '../component/iconTab';
import { useTheme } from "@/context/themeContext";
import { openDatabase } from "@/configuration/openDatabase";

export default function Index() {
  const { theme } = useTheme();
  const styles = getStyle(theme);


  const dbRef = useRef<any>(null);

  const [headers, setHeaders] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('noely');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSearch = (text: string) => setSearchText(text);

  const filteredData = useMemo(() => {
    if (!searchText) return allData;
    return allData.filter(item =>
      item.titre?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [allData, searchText]);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        const db = await openDatabase();
        dbRef.current = db; 

        const tables:any[] = await db.getAllAsync(
          "SELECT name FROM sqlite_master WHERE type='table' AND name!='sqlite_sequence'"
        );

        const headersData: any[] = [];
        let firstDataLoaded = false;

        for (const t of tables) {
          const tableName = t.name;
          const data:any[] = await db.getAllAsync(`SELECT titre, parole FROM ${tableName}`);
          
          if (data && data.length > 0) {
            headersData.push({ type: tableName, titre: data[0].titre });

            // Charger la première table par défaut
            if (!firstDataLoaded) {
              setAllData(data);
              setCurrentCategory(tableName);
              firstDataLoaded = true;
            }
          }
        }

        setHeaders(headersData);
        setLoading(false);

      } catch (error) {
        console.error("❌ ERREUR de connexion à la base de données:", error);
        setLoading(false);
      }
    };

    initDatabase();
  }, []);

  const handleCategoryChange = async (category: string) => {
    if (!dbRef.current) {
      console.error("Base non initialisée");
      return;
    }

    try {
      const data = await dbRef.current.getAllAsync(`SELECT titre, parole FROM ${category}`);
      setCurrentCategory(category);
      setAllData(data);
      setSearchText('');
    } catch (error) {
      console.error(`Erreur lors du chargement de la catégorie ${category}:`, error);
    }
  };

const handleDelete = async (titre: string) => {
  try {
    await dbRef.current.runAsync(`DELETE FROM ${currentCategory} WHERE titre= ?`, [titre]);
    setAllData(prevData => prevData.filter(item => item.titre !== titre));
    
  } catch(err) {
    console.error("Erreur lors de la suppression", err);
  }
}
  if (loading) {
    return (
      <SafeAreaView style={[styles.container,{backgroundColor:color[theme].tint}]}>
        <Card style={styles.body} theme={theme}>
          <Text>Chargement ...</Text>
        </Card>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:color[theme].tint}]}>
      {/* HEADER */}
      <View style={styles.title}>

        <ThemedText variant="headline" theme={theme}>SUPPRIMER</ThemedText>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.search}>
        {/* <AntDesign style={{paddingLeft:11}} name="search1" size={20} color="black" /> */}
        <EvilIcons name="search" color="#000" size={25} style={{paddingLeft:11}}/>
        <SearchBar 
          style={{paddingLeft:10, flex:1}}
          theme={theme}
          onChangeFunction={handleSearch}
          value={searchText}
          placeholder="Rechercher le titre à supprimer"
        />
      </View>

      {/* CATEGORY TABS */}
      <View style={styles.card}>
        <FlatList
          data={headers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.type}
          renderItem={({ item }) => (
            <OverlaySurface
              theme={theme}
              style={[
                styles.header,
                currentCategory === item.type && { backgroundColor: color[theme].activeCategory }
              ]}
              elevation={6}>
              <Pressable
                  style={{height:30,width:80,alignItems:'center',justifyContent:'center'}}
                  onPress={() => handleCategoryChange(item.type)}
                >
                  <ThemedText variant="title" theme={theme}>{item.type}</ThemedText>
                </Pressable>
           </OverlaySurface>
          )}
        />
      </View>

      {/* CONTENT */}
      <OverlaySurface theme={theme} style={styles.hiraBody} elevation={4}>
       <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <OverlaySurface theme={theme} style={styles.body} elevation={9}>
              <Pressable style={styles.musicContainer}>
                <ThemedText theme={theme} variant="normal">{item.titre}</ThemedText>
                {/* <FontAwesome5 name="delete" size={20} color="" style={{marginRight:0}}/> */}
                <Pressable style={{height:35,width:60}} onPress={()=>handleDelete(item.titre)}>
                 <MaterialCommunityIcons style={{marginRight:4}} name="delete-outline" color="black" size={24} />
                </Pressable>
              </Pressable>
            </OverlaySurface>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ThemedText theme={theme} variant="body3">
                {searchText ? "Aucun résultat trouvé" : "Aucune donnée disponible"}
              </ThemedText>
            </View>
          }
        />
      </OverlaySurface>

      {/* ICON BAR */}
      <OverlaySurface theme={theme} style={styles.iconBar} elevation={0}>
        <View style={styles.iconContainer}>
          <IconTab icon="home" tabStyle={styles.tab} path='/'/>
          <IconTab icon="book" tabStyle={styles.tab} path="/admin"/>
        </View>
      </OverlaySurface>
    </SafeAreaView>
  );
}


const getStyle = (theme: 'light' | 'dark') => StyleSheet.create({
  container: { flex: 1, color: 'white' },
  musicContainer: { flexDirection: 'row', display:"flex" , justifyContent:"space-between"},
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 7 },
  header: {
    width: 80, height: 30, margin: 10, borderRadius: 12,
    backgroundColor: color[theme].fondTitle,
    ...shadows[theme].dp1
  },
  title: { flexDirection: 'row', alignItems: 'center' },
  search: {
    backgroundColor: color[theme].fondSearchBare,
    height: 40, marginHorizontal: 12,
    flexDirection: 'row', alignItems: 'center',
    borderRadius:10
  },
  body: {
    backgroundColor: color[theme].fondCardList,
    height: 50, padding: 9, borderRadius: 15, gap: 16,
    marginLeft: 10, marginRight: 10, marginTop: 12,
    borderColor:color[theme].fondBorder,borderWidth:0.5,
    ...shadows[theme].dp2
  },
  hiraBody: {
    marginTop: 4, paddingVertical: 8, backgroundColor: color[theme].fondBody,
    borderRadius: 15, flex: 1
  },
  iconContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  iconBar: {
    backgroundColor: color[theme].tint, paddingVertical: 10, marginTop: 4,
    borderRadius: 8, height: 45, paddingTop: 12
  },
  tab: { alignItems: 'center' },
  emptyContainer: { padding: 20, alignItems: 'center', justifyContent: 'center' }
});
