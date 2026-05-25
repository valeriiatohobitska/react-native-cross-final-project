import React, { useMemo } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '../components/ProductCard';
import { useFavourites } from '../context/FavouritesContext';
import { useTheme } from '../context/ThemeContext';
import { SCREENS } from '../constants/screens';
import { layout, spacing, typography } from '../constants/theme';
import { CoffeeProduct } from '../data/products';
import { MainTabParamList } from '../navigation/types';

type Navigation = BottomTabNavigationProp<MainTabParamList, typeof SCREENS.TAB_FAVOURITES>;

export function FavouritesScreen() {
  const { colors } = useTheme();
  const { favourites } = useFavourites();
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const appWidth = Math.min(width, layout.phoneMaxWidth);
  const columns = appWidth >= 360 ? 2 : 1;
  const cardWidth = useMemo(
    () => (appWidth - spacing.lg * 2 - spacing.md * (columns - 1)) / columns,
    [appWidth, columns],
  );

  const handlePress = (product: CoffeeProduct) => {
    navigation.navigate(SCREENS.TAB_MENU, {
      screen: SCREENS.PRODUCT_DETAILS,
      params: { productId: product.id },
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<CoffeeProduct>) => (
    <ProductCard product={item} width={cardWidth} onPress={() => handlePress(item)} />
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {favourites.length === 0 ? (
        <View style={[styles.empty, { paddingTop: insets.top + spacing.lg }]}>
          <Text style={[styles.title, { color: colors.text }]}>Favourites</Text>
          <Text style={[styles.emptyText, { color: colors.muted }]}>
            No favourites yet. Tap the heart on any drink to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          key={columns}
          data={favourites}
          numColumns={columns}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          columnWrapperStyle={columns > 1 ? styles.productRow : undefined}
          ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingTop: insets.top + spacing.sm },
          ]}
          ListHeaderComponent={
            <Text style={[styles.title, { color: colors.text }]}>Favourites</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  empty: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '900',
    marginBottom: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.body,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: layout.bottomTabsHeight,
  },
  productRow: {
    gap: spacing.md,
  },
  rowSeparator: {
    height: spacing.md,
  },
});
