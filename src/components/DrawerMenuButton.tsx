import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { CoffeeIcon } from './CoffeeIcon';
import { useTheme } from '../context/ThemeContext';
import { radii } from '../constants/theme';

export function DrawerMenuButton() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.75}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={[
        styles.menuButton,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ]}
    >
      <CoffeeIcon name="menu" size={24} color={colors.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
});
