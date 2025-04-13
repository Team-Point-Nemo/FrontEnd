// Custom hook for fetching weather according coordinates

import { useEffect, useState } from 'react';
import { getCurrentWeatherInLocation } from '../api';

export default function useWeather(location) {

    const [weather, setWeather] = useState({});

    useEffect(() => {
        if (!location?.latitude || !location?.longitude)
            return;

        const getWeather = async () => {
            try {
                const data = await getCurrentWeatherInLocation(location);
                if (data) {
                    setWeather(data);
                    console.log(data);
                } else {
                    console.error("Weather data not found");
                    setWeather(null);
                }
            } catch (err) {
                console.error("Error in fetching weather: ", err);
                setWeather(null);
            }
        };
        getWeather();
    }, [location]);

    return { weather };
}