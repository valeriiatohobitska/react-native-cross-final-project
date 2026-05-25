import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { radii, spacing, typography } from '../constants/theme';

type FilterChipsProps = {
  ingredients: string[];
  selected: string[];
  onToggle: (ingredient: string) => void;
};

export function FilterChips({ ingredients, selected, onToggle }: FilterChipsProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {ingredients.map(ingredient => {
        const active = selected.includes(ingredient);
        return (
          <TouchableOpacity
            key={ingredient}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            activeOpacity={0.75}
            onPress={() => onToggle(ingredient)}
            style={[
              styles.chip,
              active
                ? { backgroundColor: colors.coffee }
                : { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? '#FFFFFF' : colors.muted },
              ]}
            >
              {ingredient}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
  },
  label: {
    fontSize: typography.caption,
    fontWeight: '700',
  },
});
