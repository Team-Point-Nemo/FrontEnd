// Custom hook for city search

import { useState } from 'react';
import { getCityCoords } from '../api';

export default function useCitySearch() {

    const [searchLocation, setSearchLocation] = useState(null);

    const searchCity = async (city) => {
        
        if (!city.trim()) {
            Alert.alert("No city input ", error)
            return
        }
        const trimmedCity = city.trim();

        try {
            const cityCoords = await getCityCoords(trimmedCity);
            if (cityCoords) {
                setSearchLocation({
                    latitude: cityCoords.coord.lat,
                    longitude: cityCoords.coord.lon,
                });
            } else {
                console.error("City location not found.");
                setSearchLocation(null)
            }
        } catch (err) {
            console.error("Error in fetching searched city location: ", err);
            setSearchLocation(null)
        }
    };

    return { searchLocation, searchCity };

}
