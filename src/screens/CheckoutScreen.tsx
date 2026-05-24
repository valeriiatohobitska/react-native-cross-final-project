import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchCoffeeProduct } from '../api/coffeeApi';
import { ApplePaySheet } from '../components/ApplePaySheet';
import { CheckoutHeader } from '../components/CheckoutHeader';
import { PaymentOption } from '../components/PaymentOption';
import { PayButton } from '../components/PayButton';
import { SuccessModal } from '../components/SuccessModal';
import { useTheme } from '../context/ThemeContext';
import { SCREENS } from '../constants/screens';
import { layout, spacing, typography } from '../constants/theme';
import { CoffeeProduct } from '../data/products';
import { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, typeof SCREENS.CHECKOUT>;

export function CheckoutScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card'>('apple');
  const [isPaySheetVisible, setIsPaySheetVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [product, setProduct] = useState<CoffeeProduct | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const productId = route.params?.productId;

  const loadProduct = useCallback(async () => {
    setIsLoadingProduct(true);
    setErrorMessage('');

    try {
      const selectedProduct = await fetchCoffeeProduct(productId);
      setProduct(selectedProduct);
    } catch {
      setErrorMessage('Could not refresh order details.');
      setProduct(null);
    } finally {
      setIsLoadingProduct(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

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
          {isLoadingProduct ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={colors.coffee} />
              <Text style={[styles.checkoutDescription, { color: colors.muted }]}>
                Loading order details...
              </Text>
            </View>
          ) : (
            <Text style={[styles.checkoutDescription, { color: colors.muted }]}>
              {product
                ? `You are ordering ${product.title} for ${product.price}.`
                : errorMessage ||
                  'Product id was not passed, so the order will be reviewed before payment.'}
            </Text>
          )}
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
              onCancel={() => setIsPaySheetVisible(false)}
              onConfirm={() => {
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
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
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
