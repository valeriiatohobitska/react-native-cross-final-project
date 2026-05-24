import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { layout, radii, spacing, typography } from '../constants/theme';
import { CoffeeIcon } from './CoffeeIcon';

type ToolbarButtonProps = {
  iconName: 'arrow-up-down' | 'list-filter';
  label: string;
  badge?: string;
};

export function ToolbarButton({ iconName, label, badge }: ToolbarButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.button, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <CoffeeIcon name={iconName} size={14} color={colors.muted} />
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      {badge ? (
        <View style={[styles.badge, { backgroundColor: colors.coffee }]}>
          <Text style={[styles.badgeText, { color: colors.background }]}>{badge}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: layout.controlHeight - 8,
    minWidth: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radii.sm,
  },
  label: {
    fontSize: typography.caption,
    fontWeight: '500',
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: typography.tiny,
    fontWeight: '800',
  },
});
