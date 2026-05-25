import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ApplePaySheet } from '../components/ApplePaySheet';
import { CheckoutHeader } from '../components/CheckoutHeader';
import { PaymentOption } from '../components/PaymentOption';
import { PayButton } from '../components/PayButton';
import { SuccessModal } from '../components/SuccessModal';
import { useTheme } from '../context/ThemeContext';
import { SCREENS } from '../constants/screens';
import { layout, spacing, typography } from '../constants/theme';
import { HomeStackParamList } from '../navigation/types';
import { RootState } from '../store/store';
import { clearCart, CartItem } from '../store/cartSlice';
import { placeOrder } from '../store/ordersSlice';

type Props = NativeStackScreenProps<HomeStackParamList, typeof SCREENS.CHECKOUT>;

function computeTotal(items: CartItem[]): string {
  const sum = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return acc + price * item.quantity;
  }, 0);
  return `$ ${sum.toFixed(2)}`;
}

export function CheckoutScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card'>('apple');
  const [isPaySheetVisible, setIsPaySheetVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const total = useMemo(() => computeTotal(cart), [cart]);

  const orderDescription = useMemo(() => {
    if (cart.length === 0) {
      return 'Your cart is empty.';
    }
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const firstName = cart[0].title;
    const itemsLabel = itemCount === 1 ? '1 item' : `${itemCount} items`;
    return cart.length === 1
      ? `${firstName} · ${itemsLabel} · ${total}`
      : `${firstName} & ${cart.length - 1} more · ${itemsLabel} · ${total}`;
  }, [cart, total]);

  const itemSummary = useMemo(() => {
    if (cart.length === 0) {
      return 'ORDER';
    }
    return cart.length === 1
      ? cart[0].title.toUpperCase()
      : `${cart[0].title.toUpperCase()} +${cart.length - 1}`;
  }, [cart]);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        style={[styles.screen, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.checkoutContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}>
        <CheckoutHeader onBack={() => navigation.goBack()} />
        <View style={styles.checkoutCopy}>
          <Text style={[styles.checkoutTitle, { color: colors.text }]}>
            Choose a payment method
          </Text>
          <Text style={[styles.checkoutDescription, { color: colors.muted }]}>
            {orderDescription}
          </Text>
        </View>
        <View style={styles.paymentStack}>
          <PaymentOption
            title="Apple Pay"
            selected={paymentMethod === 'apple'}
            checkedLabel="My billing address is the same as my shipping address"
            onPress={() => setPaymentMethod('apple')}
          />
          <PaymentOption
            title="Credit card"
            selected={paymentMethod === 'card'}
            onPress={() => setPaymentMethod('card')}
          />
        </View>
        <PayButton onPress={() => setIsPaySheetVisible(true)} />
      </ScrollView>
      <Modal
        transparent
        visible={isPaySheetVisible}
        animationType="none"
        presentationStyle="overFullScreen"
        statusBarTranslucent>
        <View style={styles.paymentModal}>
          <View style={styles.paymentModalPhone}>
            <ApplePaySheet
              total={total}
              itemSummary={itemSummary}
              onCancel={() => setIsPaySheetVisible(false)}
              onConfirm={() => {
                dispatch(
                  placeOrder({
                    id: Date.now().toString(),
                    items: [...cart],
                    total: computeTotal(cart),
                    date: new Date().toISOString(),
                    paymentMethod,
                  }),
                );
                dispatch(clearCart());
                setIsPaySheetVisible(false);
                setIsSuccessVisible(true);
              }}
            />
          </View>
        </View>
      </Modal>
      <SuccessModal
        visible={isSuccessVisible}
        onDone={() => setIsSuccessVisible(false)}
        onMenu={() => {
          setIsSuccessVisible(false);
          navigation.popToTop();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  checkoutContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  checkoutCopy: {
    marginTop: spacing.xxl,
  },
  checkoutTitle: {
    fontSize: typography.heading,
    fontWeight: '900',
  },
  checkoutDescription: {
    fontSize: typography.caption,
    lineHeight: 18,
    marginTop: spacing.sm,
    maxWidth: 320,
  },
  paymentStack: {
    gap: spacing.lg,
    marginTop: 40,
  },
  paymentModal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  paymentModalPhone: {
    flex: 1,
    width: '100%',
    maxWidth: layout.phoneMaxWidth,
    position: 'relative',
    overflow: 'hidden',
  },
});
