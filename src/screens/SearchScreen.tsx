import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CoffeeIcon } from '../components/CoffeeIcon';
import { RecentSearchList } from '../components/RecentSearchList';
import { SearchField } from '../components/SearchField';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../constants/theme';
import { recentSearches } from '../data/products';

export function SearchScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.searchOnlyHeader, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={styles.searchBackButton}>
          <CoffeeIcon name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.searchInputWrap}>
          <SearchField value="Hot" editable autoFocus onSubmit={() => navigation.goBack()} />
        </View>
      </View>
      <RecentSearchList searches={recentSearches} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchOnlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  searchBackButton: {
    width: 36,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputWrap: {
    flex: 1,
  },
});
