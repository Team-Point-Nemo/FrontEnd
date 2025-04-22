import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useFavorites() {

    const [favorites, setFavorites] = useState([{}]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const savedFavorites = await AsyncStorage.getItem('favorites');
                if (savedFavorites) {
                    setFavorites(JSON.parse(savedFavorites));
                }
            } catch (e) {
                console.error('Error loading favorites from AsyncStorage: ', e);
            }
        };
        loadFavorites();
    }, []);

    const saveFavorite = async (city) => {
        try {
            const jsonValue = JSON.stringify(city);
            await AsyncStorage.setItem('favorites', jsonValue);
        }
        catch (e) {
            console.error('Error saving favorites', e)
        }

    }

    const deleteFavorite = async (city) => {
        try {
            const jsonValue = JSON.stringify(city);
            await AsyncStorage.removeItem('favorites', jsonValue)
        }
        catch (e) {
            console.error('Error deleting favorites', e)
        }
    }
};