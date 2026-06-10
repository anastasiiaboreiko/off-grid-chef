import React, { useState, useEffect, useCallback } from 'react';
import { useMemo, type ReactNode } from 'react';
import { FavoritesContext } from './FavoritesContextStore';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback(
    (id: number) => {
      setFavorites(prev => {
        if (prev.includes(id)) {
          return prev.filter(favId => favId !== id);
        } else {
          return [...prev, id];
        }
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
    }),
    [favorites, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
