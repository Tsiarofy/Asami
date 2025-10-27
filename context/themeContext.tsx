// ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger le thème au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('@app_theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
          setThemeState(storedTheme);
        }
        // Si storedTheme est null, on garde 'light' par défaut
      } catch (e) {
        console.error('Erreur chargement thème:', e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Fonction pour changer le thème ET le sauvegarder
  const setTheme = async (newTheme: ThemeType) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem('@app_theme', newTheme);
    } catch (e) {
      console.error('Erreur sauvegarde thème:', e);
    }
  };

  // Éviter le rendu pendant le chargement
  if (!isLoaded) {
    return null; // ou un composant de loading
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Fonctions exportées si besoin ailleurs (optionnel)
export const saveTheme = async (theme: ThemeType) => {
  try {
    await AsyncStorage.setItem('@app_theme', theme);
  } catch (e) {
    console.error('Erreur sauvegarde thème:', e);
  }
};

export const getTheme = async (): Promise<ThemeType> => {
  try {
    const theme = await AsyncStorage.getItem('@app_theme');
    return (theme as ThemeType) || 'light';
  } catch (e) {
    console.error('Erreur lecture thème:', e);
    return 'light';
  }
};