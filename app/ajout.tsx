import React,{ useState, useEffect, useRef, useCallback }  from "react";
import { View,StyleSheet, Image, TextInput, Pressable, FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useTheme } from "../context/themeContext";


// Components
import OverlaySurface from "@/component/overlaySurface";
import { ThemedText } from '../component/themedText';
import { IconTab } from "@/component/iconTab";
import DarkThemeButton from '../component/bouttondark';
import { Card } from '../component/card';

// Constants
import { color } from '@/constant/color';
import { shadows } from "@/constant/shadow";
import { openDatabase } from "@/configuration/openDatabase";

// Types
interface DatabaseTable {
  name: string;
}

interface ErrorState {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
}
// Error messages constants
const ERROR_MESSAGES = {
  INVALID_LINES: "Le fichier doit contenir au moins 4 lignes de texte valides.",
  NO_DOCUMENT: "Veuillez sélectionner un document texte.",
  INVALID_DATA: "Veuillez remplir tous les champs obligatoires.",
  DATABASE_ERROR: "Erreur lors de l'ajout dans la base de données.",
  DATABASE_CONNECTION: "Erreur de connexion à la base de données.",
  FILE_READ_ERROR: "Erreur lors de la lecture du fichier.",
} as const;

const SUCCESS_MESSAGES = {
  DATA_ADDED: "Informations ajoutées avec succès!",
} as const;

export default function Parole() {
  const { theme } = useTheme();
  const [tables, setTables] = useState<DatabaseTable[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [parole, setParole] = useState<string>('');
  const [error, setError] = useState<ErrorState | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dbRef = useRef<any>(null);

  const styles = getStyle(theme);

  // Compte les lignes valides dans le texte
  const countValidLines = useCallback((text: string): number => {
    try {
      const lines = text.split(/\r?\n/);
      const validLines = lines.filter(line => line.trim() !== "");
      return validLines.length;
    } catch (err) {
      console.error('Error counting lines:', err);
      return 0;
    }
  }, []);

  // Gestion de la sélection de fichier
  const handleFileSelection = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      
      const result = await DocumentPicker.getDocumentAsync({ 
        type: 'text/plain',
        copyToCacheDirectory: true 
      });

      if (result.canceled) {
        setError({
          message: ERROR_MESSAGES.NO_DOCUMENT,
          type: 'warning'
        });
        setIsValid(false);
        return;
      }

      const fileUri = result.assets[0].uri;
      
      // Vérification de la taille du fichier (max 1MB)
      // const fileInfo = await FileSystem.getInfoAsync(fileUri);


      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      //   if (fileContent.size && fileInfo.size > 1024 * 1024) {
      //   setError({
      //     message: "Le fichier est trop volumineux (max 1MB).",
      //     type: 'error'
      //   });
      //   return;
      // }
      const lineCount = countValidLines(fileContent);

      if (!fileContent || lineCount < 4) {
        setError({
          message: ERROR_MESSAGES.INVALID_LINES,
          type: 'error'
        });
        setIsValid(false);
        return;
      }

      setParole(fileContent);
      setError(null);

    } catch (err) {
      console.error('File selection error:', err);
      setError({
        message: ERROR_MESSAGES.FILE_READ_ERROR,
        type: 'error'
      });
      setIsValid(false);
    }
  }, [countValidLines]);

  // Validation des données du formulaire
  const validateForm = useCallback((): boolean => {
    if (!inputValue.trim()) {
      setError({
        message: "Veuillez saisir un titre.",
        type: 'error'
      });
      return false;
    }

    if (!currentCategory) {
      setError({
        message: "Veuillez sélectionner une catégorie.",
        type: 'error'
      });
      return false;
    }

    if (!parole) {
      setError({
        message: "Veuillez sélectionner un fichier contenant les paroles.",
        type: 'error'
      });
      return false;
    }

    return true;
  }, [inputValue, currentCategory, parole]);

  // Soumission du formulaire
  const handleSubmit = useCallback(async (): Promise<void> => {
    try {
      setError(null);

      if (!validateForm()) {
        return;
      }

      if (!dbRef.current) {
        throw new Error('Database not initialized');
      }

      await dbRef.current.runAsync(
        `INSERT INTO ${currentCategory} (titre, parole) VALUES (?, ?)`,
        [inputValue.trim(), parole]
      );

      setIsValid(true);
      setInputValue('');
      setParole('');
      setCurrentCategory('');
      setError({
        message: SUCCESS_MESSAGES.DATA_ADDED,
        type: 'success'
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setError(null);
        setIsValid(false);
      }, 3000);

    } catch (err) {
      console.error('Database insertion error:', err);
      setError({
        message: ERROR_MESSAGES.DATABASE_ERROR,
        type: 'error'
      });
      setIsValid(false);
    }
  }, [validateForm, currentCategory, inputValue, parole]);

  // Gestion du changement de catégorie
  const handleCategoryChange = useCallback((categoryName: string): void => {
    setCurrentCategory(categoryName);
    setError(null); // Clear errors when category changes
  }, []);

  // Chargement des données initiales
  useEffect(() => {
    let mounted = true;

    const initializeDatabase = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const db = await openDatabase();
        dbRef.current = db;

        const tablesResult = await db.getAllAsync(
          "SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'"
        ) as DatabaseTable[];

        if (mounted) {
          setTables(tablesResult);
        }

      } catch (err) {
        console.error('Database initialization error:', err);
        if (mounted) {
          setError({
            message: ERROR_MESSAGES.DATABASE_CONNECTION,
            type: 'error'
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeDatabase();

    return () => {
      mounted = false;
    };
  }, [isValid]);

  // Affichage du statut de chargement
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: color[theme].tint }]}>
        <Card style={styles.body} theme={theme}>
          <ThemedText theme={theme} variant="body3">
            Chargement...
          </ThemedText>
        </Card>
      </SafeAreaView>
    );
  }

  // Fonction pour obtenir la couleur du message en fonction du type
  const getMessageColor = (type: ErrorState['type']): string => {
    const colors = {
      error: '#ff4444',
      success: '#4CAF50',
      warning: '#ff9800',
      info: '#2196F3'
    };
    return colors[type];
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color[theme].tint }]}>
      {/* Header */}
      <View style={styles.title}>
        <Image 
          style={styles.logo}
          source={require("@/assets/images/favicon.png")} 
          width={30} 
          height={30} 
        />
        <ThemedText variant="headline" theme={theme}>
          Espace admin
        </ThemedText>
      </View>

      {/* Main Content */}
      <OverlaySurface theme={theme} style={styles.hiraBody} elevation={4}>
        <View>
          {/* Category Selection */}
          <View style={styles.sectionHeader}>
            <ThemedText variant="body3" theme={theme}>
              Choisissez le type
            </ThemedText>
          </View>

          <FlatList
            data={tables}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <OverlaySurface 
                theme={theme} 
                style={[
                  styles.categoryItem, 
                  currentCategory === item.name && { backgroundColor: color[theme].fondTitle }
                ]} 
                elevation={9}
              >                  
                <Pressable 
                  style={styles.categoryButton}
                  onPress={() => handleCategoryChange(item.name)}
                >
                  <ThemedText variant="title" theme={theme}>
                    {item.name}
                  </ThemedText>
                </Pressable>
              </OverlaySurface>
            )}
          />

          {/* Song Title Input */}
          <View style={styles.section}>
            <ThemedText variant="body3" theme={theme}>
              Entrer le titre de la chanson
            </ThemedText>
            <TextInput 
              style={styles.input} 
              placeholder="Entrer ici le titre de la chanson" 
              placeholderTextColor={color[theme].placeholder}
              onChangeText={setInputValue} 
              value={inputValue}
              maxLength={100}
            />
          </View>

          {/* File Selection and Actions */}
          <View style={styles.section}>
            <ThemedText variant="body3" theme={theme}>
              Naviguer vers le fichier contenant la parole
            </ThemedText>    
            
            <DarkThemeButton 
              style={styles.button} 
              title="Naviguer" 
              onPress={handleFileSelection} 
            />
            
            <DarkThemeButton 
              style={styles.button} 
              title="Valider" 
              onPress={handleSubmit} 
            />

            {/* Status Messages */}
            {error && (
              <ThemedText 
                variant="title" 
                theme={theme} 
                style={{ color: getMessageColor(error.type) }}
              >
                {error.message}
              </ThemedText>
            )}
          </View>
        </View>
      </OverlaySurface>

      {/* Bottom Navigation */}
      <OverlaySurface theme={theme} style={styles.iconBar} elevation={0}>
        <View style={styles.iconContainer}>
          <IconTab icon="home" tabStyle={styles.tab} path="/" />
          <IconTab icon="book" tabStyle={styles.tab} />
        </View>
      </OverlaySurface>
    </SafeAreaView> 
  );
}

const getStyle = (theme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      color: 'white',
    },
    body: {
      backgroundColor: color[theme].fondCardList,
      height: 50,
      padding: 9,
      borderRadius: 15,
      gap: 16,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 12,
      ...shadows[theme].dp2
    },
    hiraBody: {
      marginTop: 10,
      marginHorizontal: 13,
      marginBottom: 10,
      paddingVertical: 8,
      backgroundColor: color[theme].fondBody,
      borderRadius: 15,
      flex: 1
    },
    input: {
      color: color[theme].textColor,
      backgroundColor: color[theme].activeCategory,
      height: 50,
      width: 280,
      marginVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: color[theme].fondBorder,
    },
    categoryItem: {
      width: 80,
      height: 30,
      margin: 10,
      backgroundColor: color[theme].fondCardList,
      borderRadius: 12,
      ...shadows[theme].dp1
    },
    categoryButton: {
      height: 30,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      width: 120,
      height: 50,
      marginVertical: 10
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    logo: {
      marginLeft: 15,
      borderRadius: 8
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
    },
    sectionHeader: {
      alignItems: "center",
      marginVertical: 12
    },
    section: {
      alignItems: 'center',
      marginVertical: 10
    }
  });
};