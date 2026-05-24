import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { CoffeeIcon } from '../components/CoffeeIcon';
import { useTheme } from '../context/ThemeContext';
import { radii, spacing, typography } from '../constants/theme';

export function ProfileScreen() {
  const { theme, colors, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
        <CoffeeIcon name="user" size={32} color={colors.coffeeDark} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <Text style={[styles.description, { color: colors.muted }]}>
        Delivery settings, saved payment methods and app preferences.
      </Text>
      <View style={[styles.themeRow, { borderTopColor: colors.border }]}>
        <View style={styles.themeLabel}>
          <CoffeeIcon name={isDark ? 'moon' : 'sun'} size={20} color={colors.coffee} />
          <Text style={[styles.themeLabelText, { color: colors.text }]}>
            {isDark ? 'Dark mode' : 'Light mode'}
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.softMuted, true: colors.coffee }}
          thumbColor={colors.background}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '900',
  },
  description: {
    fontSize: typography.body,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
  },
  themeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  themeLabelText: {
    fontSize: typography.body,
    fontWeight: '700',
  },
});
