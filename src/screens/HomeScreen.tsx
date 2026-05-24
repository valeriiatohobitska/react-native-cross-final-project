import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchCoffeeMenu } from '../api/coffeeApi';
import { CoffeeIcon } from '../components/CoffeeIcon';
import { ProductCard } from '../components/ProductCard';
import { SearchField } from '../components/SearchField';
import { ToolbarButton } from '../components/ToolbarButton';
import { useTheme } from '../context/ThemeContext';
import { SCREENS } from '../constants/screens';
import { layout, spacing, typography } from '../constants/theme';
import { CoffeeProduct } from '../data/products';
import { HomeStackParamList } from '../navigation/types';

type Navigation = NativeStackNavigationProp<
  HomeStackParamList,
  typeof SCREENS.HOME
>;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { width } = useWindowDimensions();
  const appWidth = Math.min(width, layout.phoneMaxWidth);
  const columns = appWidth >= 360 ? 2 : 1;
  const cardWidth = useMemo(
    () => (appWidth - spacing.lg * 2 - spacing.md * (columns - 1)) / columns,
    [appWidth, columns],
  );

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const menu = await fetchCoffeeMenu();
      setProducts(menu);
    } catch {
      setErrorMessage(
        'Could not load the coffee menu. Check your connection and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const renderProduct = ({ item }: ListRenderItemInfo<CoffeeProduct>) => (
    <ProductCard
      product={item}
      width={cardWidth}
      onPress={() =>
        navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId: item.id })
      }
    />
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <FlatList
        key={columns}
        data={products}
        numColumns={columns}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        columnWrapperStyle={columns > 1 ? styles.productRow : undefined}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.menuContent,
          { paddingTop: insets.top + spacing.sm },
        ]}
        ListHeaderComponent={
          <View style={styles.menuHeader}>
            <View style={styles.topRow}>
              <TouchableOpacity
                accessibilityRole="button"
                activeOpacity={0.75}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={[
                  styles.iconButton,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                  },
                ]}
              >
                <CoffeeIcon name="menu" size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="search"
                activeOpacity={0.85}
                onPress={() => navigation.navigate(SCREENS.SEARCH)}
                style={styles.searchWrap}
              >
                <SearchField value="Hot" />
              </TouchableOpacity>
            </View>
            <View style={styles.toolbar}>
              <ToolbarButton iconName="arrow-up-down" label="Sort" />
              <ToolbarButton iconName="list-filter" label="Filter" badge="2" />
            </View>
            {isLoading ? (
              <View style={styles.feedback}>
                <ActivityIndicator color={colors.coffee} />
                <Text style={[styles.feedbackText, { color: colors.muted }]}>
                  Loading coffee menu...
                </Text>
              </View>
            ) : null}
            {errorMessage ? (
              <View style={styles.feedback}>
                <Text style={[styles.errorText, { color: colors.muted }]}>
                  {errorMessage}
                </Text>
                <TouchableOpacity
                  accessibilityRole="button"
                  activeOpacity={0.8}
                  onPress={loadProducts}
                  style={[
                    styles.retryButton,
                    { backgroundColor: colors.coffee },
                  ]}
                >
                  <Text style={[styles.retryButtonText, { color: '#FFFFFF' }]}>
                    Try again
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  menuContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: layout.bottomTabsHeight,
  },
  menuHeader: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  searchWrap: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedback: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  feedbackText: {
    fontSize: typography.caption,
    fontWeight: '700',
  },
  errorText: {
    fontSize: typography.body,
    lineHeight: 21,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: typography.caption,
    fontWeight: '900',
  },
  productRow: {
    gap: spacing.md,
  },
  rowSeparator: {
    height: spacing.md,
  },
});
