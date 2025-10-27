import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface LightThemeButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const LightThemeButton: React.FC<LightThemeButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style = {},
  textStyle = {}
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.lightButton,
        disabled && styles.lightButtonDisabled,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[
        styles.lightButtonText,
        disabled && styles.lightButtonTextDisabled,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lightButton: {
    backgroundColor: '#007AFF',
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  lightButtonDisabled: {
    backgroundColor: '#E5E5EA',
    shadowOpacity: 0,
    elevation: 0,
  },
  lightButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  lightButtonTextDisabled: {
    color: '#8E8E93',
  },
});

export default LightThemeButton;
