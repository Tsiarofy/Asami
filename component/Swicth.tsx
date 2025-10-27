import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '@/context/themeContext';

export const SwitchBoutton = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme); // Cette fonction sauvegarde automatiquement
  };

  return (
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={isDarkMode ? '#3e3e3e' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={handleToggle}
      value={isDarkMode}
    />
  );
};