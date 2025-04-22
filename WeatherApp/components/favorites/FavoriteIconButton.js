import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import { useFavorites } from "./FavoritesContext";

export default function FavoriteIconButton ({ city }) {

    const { saveFavorite, deleteFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(city);
    
    const handlePress = () => {
        if (favorite) {
            deleteFavorite(city);
        } else {
            saveFavorite(city);
        }
    };

    return (
        <IconButton
            icon={favorite ? "cards-heart" : "cards-heart-outline"}
            iconColor="#fff"
            size={30}
            onPress={handlePress}
        />
    )
};