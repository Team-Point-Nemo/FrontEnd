/* Fetch calls from https://api.openweathermap.org */

import { Alert } from "react-native";

export function getCurrentWeatherInLocation(location) {
    return fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/weather-now?lat=${location.latitude}&lon=${location.longitude}`)
        .then(response => {
            if (!response.ok)
                throw new Error('Error in getting local weather', response.statusText);

            return response.json();
        });
}

export function getCityCoords(city) {
    //https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=1d08ae50364dc99048fb1f8d65e3c758&units=metric
    return fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/city?city=${city}`)
        .then(response => {
            if (!response.ok) {
                Alert.alert("City not found");
                throw new Error("Error in fetching city coordinates", response.statusText);
            }
            return response.json();
        })
}

// Weather data for 5 day / 3 hour forecast data: https://openweathermap.org/forecast5#data
export function getForecastForFiveDays(location) {
    return fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/forecast5?lat=${location.latitude}&lon=${location.longitude}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetching forecast for five days", response.statusText)

            return response.json();
        })
}

// Forecast for 16 days: https://openweathermap.org/forecast16
export function getLongTermForecast(location) {
    return fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/forecast16?lat=${location.latitude}&lon=${location.longitude}`)
        .then(response => {
            if (!response.ok)
                throw new Error(`Error in fetching forecast: ${response.statusText}`);

            return response.json();
        })
}


export function getLayerTiles(layer) {
    return `${process.env.EXPO_PUBLIC_BACKEND_URL}/tiles/${layer}/{z}/{x}/{y}.png`;
}
