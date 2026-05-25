import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useFavourites } from '../context/FavouritesContext';
import { useTheme } from '../context/ThemeContext';
import { CoffeeProduct } from '../data/products';
import { CoffeeIcon } from './CoffeeIcon';

type FavouriteButtonProps = {
  product: CoffeeProduct;
  size?: number;
  style?: ViewStyle;
};

export function FavouriteButton({ product, size = 20, style }: FavouriteButtonProps) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { colors } = useTheme();
  const active = isFavourite(product.id);

  // Exclusive tap blocks the parent GestureDetector from firing
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => toggleFavourite(product));

  return (
    <GestureDetector gesture={tap}>
      <View
        accessibilityRole="button"
        accessibilityLabel={active ? 'Remove from favourites' : 'Add to favourites'}
        style={[
          styles.button,
          active ? { backgroundColor: colors.coffee } : styles.inactive,
          style,
        ]}
      >
        <CoffeeIcon
          name="heart"
          size={size}
          color={active ? '#FFFFFF' : colors.softMuted}
        />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    borderRadius: 999,
  },
  inactive: {
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
});
