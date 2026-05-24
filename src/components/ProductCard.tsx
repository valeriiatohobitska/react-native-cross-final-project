import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';
import { radii, spacing, typography } from '../constants/theme';
import { CoffeeProduct } from '../data/products';

type ProductCardProps = {
  product: CoffeeProduct;
  width: number;
  onPress?: () => void;
};

// Spring config for the press-scale animation
const SPRING_CONFIG = { damping: 12, stiffness: 200 };

export function ProductCard({ product, width, onPress }: ProductCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onBegin(() => {
      scale.value = withSpring(0.93, SPRING_CONFIG);
    })
    .onFinalize(() => {
      scale.value = withSpring(1, SPRING_CONFIG);
      onPress?.();
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        style={[styles.card, { width, backgroundColor: colors.card }, animatedStyle]}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.copy}>
          <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
          <Text style={[styles.price, { color: colors.text }]}>{product.price}</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: radii.md,
  },
  image: {
    width: '100%',
    aspectRatio: 1.2,
  },
  copy: {
    minHeight: 68,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: typography.caption,
    fontWeight: '500',
  },
  price: {
    fontSize: typography.body,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
});
