import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerMenuButton } from '../components/DrawerMenuButton';
import { useTheme } from '../context/ThemeContext';
import { SCREENS } from '../constants/screens';
import { radii, spacing, typography } from '../constants/theme';
import { RootDrawerParamList } from '../navigation/types';

type Navigation = DrawerNavigationProp<RootDrawerParamList, typeof SCREENS.DRAWER_LOGOUT>;

export function LogoutScreen() {
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + spacing.sm, backgroundColor: colors.background }]}>
      <DrawerMenuButton />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Logged out</Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          You have left the demo profile. Sign in again to continue ordering coffee.
        </Text>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.84}
          onPress={() =>
            navigation.navigate(SCREENS.DRAWER_HOME, {
              screen: SCREENS.TAB_MENU,
              params: { screen: SCREENS.HOME },
            })
          }
          style={[styles.primaryButton, { backgroundColor: colors.coffee }]}>
          <Text style={[styles.primaryButtonText, { color: '#FFFFFF' }]}>Log in</Text>
        </TouchableOpacity>
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
  primaryButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
    marginTop: spacing.xl,
  },
  primaryButtonText: {
    fontSize: typography.body,
    fontWeight: '900',
  },
});
