import React from 'react';
import { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { useTheme } from '../context/ThemeContext';
import { layout, spacing, typography } from '../constants/theme';
import { CoffeeIcon } from './CoffeeIcon';

type TabItem = {
  id: string;
  iconName: ComponentProps<typeof Lucide>['name'];
  label: string;
  active?: boolean;
};

const tabs: TabItem[] = [
  { id: 'menu', iconName: 'search', label: 'Menu', active: true },
  { id: 'favourites', iconName: 'heart', label: 'Favourites' },
  { id: 'cart', iconName: 'shopping-bag', label: 'Cart' },
  { id: 'profile', iconName: 'star', label: 'Profile' },
];

export function BottomTabBar() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, borderTopColor: colors.surface },
      ]}>
      {tabs.map(tab => (
        <View key={tab.id} style={styles.item}>
          <CoffeeIcon
            name={tab.iconName}
            size={25}
            color={tab.active ? colors.coffee : colors.softMuted}
          />
          <Text style={[styles.label, { color: tab.active ? colors.text : colors.muted }]}>
            {tab.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: layout.bottomTabsHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
  },
  item: {
    minWidth: 64,
    alignItems: 'center',
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.tiny,
  },
});
