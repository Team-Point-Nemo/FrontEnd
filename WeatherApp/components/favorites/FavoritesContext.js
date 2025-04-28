import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        const parsed = savedFavorites ? JSON.parse(savedFavorites) : [];
        console.log("Loaded from storage:", parsed);
        setFavorites(parsed);
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    };
    loadFavorites();
  }, []);

  const saveFavorite = async (city) => {
    const exists = favorites.some((item) => item === city);
    if (!exists) {
      const updatedFavorites = [...favorites, city];
      console.log("Updated favorites:", updatedFavorites);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const deleteFavorite = async (city) => {
    const updatedFavorites = favorites.filter((item) => item !== city);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (city) => {
    return favorites.some((item) => item === city);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, saveFavorite, deleteFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
