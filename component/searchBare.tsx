import { color } from '@/constant/color';
import { TextInput, type ViewProps, StyleSheet } from 'react-native';

type SearchProps = ViewProps & {
  theme: "light" | "dark";
  placeholder: string;
  onChangeFunction ?: (text: string) => void;
  value: string; // Ajout de la prop value
};

export function SearchBar({ style, onChangeFunction, placeholder, theme, value, ...rest }: SearchProps) {
  return (
    <TextInput 
      onChangeText={onChangeFunction} 
      style={[
        styles.input, 
        { color: color[theme].SearchText, backgroundColor: color[theme].fondSearchBare }
      ]} 
      {...rest} 
      placeholder={placeholder}
      value={value}
      placeholderTextColor={color[theme].placeholder} 
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
     marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});