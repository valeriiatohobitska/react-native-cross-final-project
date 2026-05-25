import React, { createContext, useCallback, useContext, useState } from 'react';
import { CoffeeProduct } from '../data/products';

type FavouritesContextValue = {
  favourites: CoffeeProduct[];
  toggleFavourite: (product: CoffeeProduct) => void;
  isFavourite: (id: string) => boolean;
};

const FavouritesContext = createContext<FavouritesContextValue | undefined>(undefined);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<CoffeeProduct[]>([]);

  const toggleFavourite = useCallback((product: CoffeeProduct) => {
    setFavourites(prev => {
      const exists = prev.some(p => p.id === product.id);
      return exists ? prev.filter(p => p.id !== product.id) : [...prev, product];
    });
  }, []);

  const isFavourite = useCallback(
    (id: string) => favourites.some(p => p.id === id),
    [favourites],
  );

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): FavouritesContextValue {
  const ctx = useContext(FavouritesContext);
  if (!ctx) {
    throw new Error('useFavourites must be used inside FavouritesProvider');
  }
  return ctx;
}
