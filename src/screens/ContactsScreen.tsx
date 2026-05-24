import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerMenuButton } from '../components/DrawerMenuButton';
import { useTheme } from '../context/ThemeContext';
import { spacing, typography } from '../constants/theme';

export function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.sm, backgroundColor: colors.background }]}>
      <DrawerMenuButton />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Contacts</Text>
        <Text style={[styles.description, { color: colors.muted }]}>coffee@example.com</Text>
        <Text style={[styles.description, { color: colors.muted }]}>+1 555 0148</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
});
