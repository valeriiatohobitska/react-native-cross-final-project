import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { fetchCoffeeProduct } from '../api/coffeeApi';
import { PayButton } from '../components/PayButton';
import { useTheme } from '../context/ThemeContext';
import { addItem } from '../store/cartSlice';
import { SCREENS } from '../constants/screens';
import { radii, spacing, typography } from '../constants/theme';
import { CoffeeProduct } from '../data/products';
import { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, typeof SCREENS.PRODUCT_DETAILS>;

export function ProductDetailsScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<CoffeeProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const productId = route.params?.productId;

  const loadProduct = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const selectedProduct = await fetchCoffeeProduct(productId);
      setProduct(selectedProduct);
    } catch {
      setErrorMessage('Could not load drink details. Check your connection and try again.');
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
      }),
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.emptyState, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.coffee} />
        <Text style={[styles.description, { color: colors.muted }]}>Loading drink details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.emptyState, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Drink not found</Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          {errorMessage || 'Product id was not passed or does not exist.'}
        </Text>
        {errorMessage ? <PayButton title="Try again" onPress={loadProduct} /> : null}
        <PayButton title="Back to menu" onPress={() => navigation.navigate(SCREENS.HOME)} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
      <Text style={[styles.price, { color: colors.coffeeDark }]}>{product.price}</Text>
      <Text style={[styles.description, { color: colors.muted }]}>{product.description}</Text>
      {product.ingredients?.length ? (
        <View style={styles.ingredientsBlock}>
          <Text style={[styles.ingredientsTitle, { color: colors.text }]}>Ingredients</Text>
          <Text style={[styles.ingredientsText, { color: colors.muted }]}>
            {product.ingredients.join(', ')}
          </Text>
        </View>
      ) : null}
      <View style={styles.actions}>
        <PayButton title="Add to Cart" onPress={handleAddToCart} />
        <PayButton
          title="Order"
          onPress={() => navigation.navigate(SCREENS.CHECKOUT, { productId: product.id })}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  image: {
    width: '100%',
    aspectRatio: 1.15,
    borderRadius: radii.md,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '900',
    marginTop: spacing.xl,
  },
  price: {
    fontSize: typography.heading,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  description: {
    fontSize: typography.body,
    lineHeight: 21,
    marginTop: spacing.lg,
  },
  ingredientsBlock: {
    marginTop: spacing.lg,
  },
  ingredientsTitle: {
    fontSize: typography.body,
    fontWeight: '900',
  },
  ingredientsText: {
    fontSize: typography.body,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
