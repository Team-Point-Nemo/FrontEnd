
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useCityName(location) {
    const [city, setCity] = useState(null);

    useEffect(() => {
        if (!location?.latitude || !location?.longitude) {
            return;
        }
        const getCity = async () => {
            try {
                const address = await Location.reverseGeocodeAsync({
                    latitude: location.latitude,
                    longitude: location.longitude,
                });

                if (address.length > 0) {
                    setCity(address[0].city || 'Location unknown');
                }
            } catch (err) {
                console.error("Error in fetching city: ", err);
                setCity(null);
            }
        };
        getCity();
    }, [location]);

    return { city };

}
