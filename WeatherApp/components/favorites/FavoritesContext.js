import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const loadFavorites = async () => {
        try {
          const saved = await AsyncStorage.getItem('favorites');
          const parsed = saved ? JSON.parse(saved) : [];
      console.log("Loaded from storage:", parsed); 
      setFavorites(parsed);
        } catch (e) {
          console.error('Error loading favorites:', e);
        }
      };
      loadFavorites();
    }, []);
  
    const saveFavorite = async (city) => {
      const exists = favorites.some(item => item.name === city.name);
      if (!exists) {
        const updated = [...favorites, city];
        console.log("Updated favorites:", updated);
        setFavorites(updated);
        await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      }
    };
  
    const deleteFavorite = async (city) => {
      const updated = favorites.filter(item => item.name !== city.name);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    };
  
    const isFavorite = (city) => {
      return favorites.some(item => item.name === city.name);
    };
  
    return (
      <FavoritesContext.Provider
        value={{ favorites, saveFavorite, deleteFavorite, isFavorite }}>
        {children}
      </FavoritesContext.Provider>
    );
  };
  
  export const useFavorites = () => useContext(FavoritesContext);