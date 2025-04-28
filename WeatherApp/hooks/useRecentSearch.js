import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useRecentSearch() {

    const [recentCities, setRecentCities] = useState([]);

    useEffect(() => {
        const loadRecentCities = async () => {
            try {
                const savedCities = await AsyncStorage.getItem('recentCities');
                if (savedCities) {
                    setRecentCities(JSON.parse(savedCities));
                }
            } catch (err) {
                console.error("Error loading recent cities from AsyncStorage:", err);
            }
        };
        loadRecentCities();
    }, []);


    const updateRecentCities = async (city) => {
        try {
            const updatedCities = [city, ...recentCities.filter(c => c !== city)].slice(0, 5);
            setRecentCities(updatedCities);
            await AsyncStorage.setItem('recentCities', JSON.stringify(updatedCities));
            return updatedCities
        } catch (err) {
            console.log("Error updating recent cities from AsyncStorage: ", err)
        }
    }

    return { recentCities, updateRecentCities }

} 