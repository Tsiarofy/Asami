import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface DarkThemeButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const DarkThemeButton: React.FC<DarkThemeButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style = {},
  textStyle = {}
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.darkButton,
        disabled && styles.darkButtonDisabled,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[
        styles.darkButtonText,
        disabled && styles.darkButtonTextDisabled,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkButton: {
    backgroundColor: '#0A84FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  darkButtonDisabled: {
    backgroundColor: '#38383A',
    shadowOpacity: 0,
    elevation: 0,
  },
  darkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  darkButtonTextDisabled: {
    color: '#8E8E93',
  },
});

export default DarkThemeButton;