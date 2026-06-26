import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('movieFinderFavorites')) || [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('movieFinderFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }
      setToast(`${movie.title} added to favorites`);
      return [movie, ...prev];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== movieId));
    setToast('Removed from favorites');
  };

  const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite, toast, setToast }),
    [favorites, toast]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return context;
}
