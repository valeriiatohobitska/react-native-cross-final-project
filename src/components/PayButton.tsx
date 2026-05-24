import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { radii, spacing, typography } from '../constants/theme';

type PayButtonProps = {
  title?: string;
  onPress: () => void;
};

export function PayButton({ title = 'Pay', onPress }: PayButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.84}
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors.coffee }]}
    >
      <Text style={[styles.title, { color: '#FFFFFF' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.heading,
    fontWeight: '800',
  },
});
