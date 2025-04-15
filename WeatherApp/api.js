/* Fetch calls from https://api.openweathermap.org */

export function getCurrentWeatherInLocation(location) {
    return fetch(`https://valora.2.rahtiapp.fi/weather-now?lat=${location.latitude}&lon=${location.longitude}`)
        .then(response => {
            if (!response.ok)
                throw new Error('Error in getting local weather', response.statusText);

            return response.json();
        });
}

//tämä backendiin
export function getCityCoords(city) {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetching city coordinates", response.statusText);
            }
            return response.json();
        })
}

// Weather data for 5 day / 3 hour forecast data: https://openweathermap.org/forecast5#data
export function getForecastForFiveDays(location) {
    return fetch(`https://valora.2.rahtiapp.fi/forecast5?lat=${location.latitude}&lon=${location.longitude}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetching forecast for five days", response.statusText)

            return response.json();
        })
}

// Forecast for 16 days: https://openweathermap.org/forecast16
export function getLongTermForecast(location) {
    return fetch(`https://valora.2.rahtiapp.fi/forecast16?lat=${location.latitude}&lon=${location.longitude}`)
        .then(response => {
            if (!response.ok)
                throw new Error(`Error in fetching forecast: ${response.statusText}`);

            return response.json();
        })
}


export function getLayerTiles(layer) {
    return `https://valora.2.rahtiapp.fi/tiles/${layer}/{z}/{x}/{y}.png`;
}
