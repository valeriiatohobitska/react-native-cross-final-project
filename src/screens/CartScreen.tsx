import React, { memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { RootState } from '../store/store';
import { CartItem, removeItem, updateQuantity } from '../store/cartSlice';
import { SCREENS } from '../constants/screens';
import { MainTabParamList } from '../navigation/types';
import { radii, spacing, typography } from '../constants/theme';

type CartRowProps = {
  item: CartItem;
  onRemove: (id: string) => void;
  onDecrement: (id: string, current: number) => void;
  onIncrement: (id: string, current: number) => void;
};

// memo prevents re-render when sibling cart items change
const CartRow = memo(function CartRow({
  item,
  onRemove,
  onDecrement,
  onIncrement,
}: CartRowProps) {
  const { colors } = useTheme();

  // useMemo: recalculate line total only when price or quantity changes
  const lineTotal = useMemo(() => {
    const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return (priceValue * item.quantity).toFixed(2);
  }, [item.price, item.quantity]);

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.rowImage} />
      <View style={styles.rowBody}>
        <Text style={[styles.rowTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.rowPrice, { color: colors.coffeeDark }]}>
          ${lineTotal}
        </Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={() => onDecrement(item.id, item.quantity)}
            style={[styles.qtyBtn, { backgroundColor: colors.surface }]}>
            <Text style={[styles.qtyBtnText, { color: colors.text }]}>−</Text>
          </TouchableOpacity>
          <Text style={[styles.qtyValue, { color: colors.text }]}>{item.quantity}</Text>
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={() => onIncrement(item.id, item.quantity)}
            style={[styles.qtyBtn, { backgroundColor: colors.surface }]}>
            <Text style={[styles.qtyBtnText, { color: colors.text }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.7}
        onPress={() => onRemove(item.id)}
        style={styles.removeBtn}>
        <Text style={[styles.removeBtnText, { color: colors.muted }]}>✕</Text>
      </TouchableOpacity>
    </View>
  );
});

type Navigation = BottomTabNavigationProp<MainTabParamList, typeof SCREENS.TAB_CART>;

export function CartScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigation>();

  const handleCheckout = useCallback(() => {
    navigation.navigate(SCREENS.TAB_MENU, {
      screen: SCREENS.CHECKOUT,
      params: {},
    });
  }, [navigation]);

  // useCallback: stable references so CartRow.memo sees identical props between renders
  const handleRemove = useCallback(
    (id: string) => dispatch(removeItem(id)),
    [dispatch],
  );
  const handleDecrement = useCallback(
    (id: string, current: number) =>
      dispatch(updateQuantity({ id, quantity: current - 1 })),
    [dispatch],
  );
  const handleIncrement = useCallback(
    (id: string, current: number) =>
      dispatch(updateQuantity({ id, quantity: current + 1 })),
    [dispatch],
  );

  // useMemo: recalculate cart total only when cart array changes
  const total = useMemo(
    () =>
      cart
        .reduce((sum, item) => {
          const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
          return sum + price * item.quantity;
        }, 0)
        .toFixed(2),
    [cart],
  );

  if (cart.length === 0) {
    return (
      <View style={[styles.emptyState, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text>
        <Text style={[styles.emptyDesc, { color: colors.muted }]}>
          Browse the menu and add drinks you'd like to order.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CartRow
            item={item}
            onRemove={handleRemove}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
        )}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + spacing.lg }]}
        ListHeaderComponent={
          <Text style={[styles.screenTitle, { color: colors.text }]}>Cart</Text>
        }
        ListFooterComponent={
          <View style={styles.footerBlock}>
            <View style={[styles.footer, { borderTopColor: colors.border }]}>
              <Text style={[styles.totalLabel, { color: colors.muted }]}>Total</Text>
              <Text style={[styles.totalValue, { color: colors.text }]}>${total}</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              activeOpacity={0.85}
              onPress={handleCheckout}
              style={[styles.checkoutBtn, { backgroundColor: colors.coffee }]}>
              <Text style={styles.checkoutBtnText}>Checkout</Text>
            </TouchableOpacity>
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
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  screenTitle: {
    fontSize: typography.title,
    fontWeight: '900',
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    gap: spacing.md,
  },
  rowImage: {
    width: 64,
    height: 64,
    borderRadius: radii.sm,
  },
  rowBody: {
    flex: 1,
    gap: spacing.xs,
  },
  rowTitle: {
    fontSize: typography.body,
    fontWeight: '700',
  },
  rowPrice: {
    fontSize: typography.caption,
    fontWeight: '900',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: typography.body,
    fontWeight: '700',
    lineHeight: 20,
  },
  qtyValue: {
    fontSize: typography.body,
    fontWeight: '900',
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    padding: spacing.sm,
  },
  removeBtnText: {
    fontSize: typography.body,
  },
  footerBlock: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
  },
  checkoutBtn: {
    height: 52,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: typography.body,
    fontWeight: '900',
  },
  totalLabel: {
    fontSize: typography.body,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: typography.heading,
    fontWeight: '900',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.title,
    fontWeight: '900',
  },
  emptyDesc: {
    fontSize: typography.body,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
});
