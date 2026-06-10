import React from 'react';

export type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => { },
});
