import * as React from "react";
import { useState } from 'react';
import { IconButton } from "react-native-paper";
import { View } from 'react-native';
import { useFavorites } from "./FavoritesContext";
import FavoriteDialog from './FavoriteDialog';

export default function FavoriteIconButton({ city }) {

    const { saveFavorite, deleteFavorite, isFavorite } = useFavorites();

    const [showDialog, setShowDialog] = useState(false);

    const handleFavoritePress = () => {
        if (isFavorite(city)) {
            setShowDialog(true);
        } else {
            saveFavorite(city);
        }
    };

    const handleDeleteConfirm = () => {
        deleteFavorite(city);
        setShowDialog(false);
    };

    const handleDeleteCancel = () => {
        setShowDialog(false);
    };

    return (
        <View>
            <IconButton
                icon={isFavorite(city) ? "cards-heart" : "cards-heart-outline"}
                iconColor={'#fff'}
                size={30}
                onPress={handleFavoritePress}
            />
            <FavoriteDialog
                visible={showDialog}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </View>
    )
};
