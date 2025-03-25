/* Fetch calls from https://api.openweathermap.org*/

export function getCurrentWeatherInLocation(location) {
    console.log(location);
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)
    .then(response => {
        if(!response.ok)
            throw new Error('Error in getting local weather', response.statusText);

        return response.json();
    });
}

export function getCityCoords(city) {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Error in fetch", response.statusText);
        }
        return response.json();
    })
}

// Weather data for 5 day / 3 hour forecast data: https://openweathermap.org/forecast5#data
export function getForecastForFiveDays(location){
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)
    // return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/forecast/daily?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
    .then(response => {
        if(!response.ok)
            throw new Error("Error in fetch: ", response.statusText)

        return response.json()
    })
}


// Forecast for 16 days: https://openweathermap.org/forecast16
export function getLongTermForecast(location){
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/forecast/daily?lat=${location.latitude}&lon=${location.longitude}&cnt=16&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)
    //return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/forecast/daily?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
        .then(response => {
            if(!response.ok)
                throw new Error("Error in fetch ", response.statusText);

            return response.json();
        })
}

export function getRainTiles() {
    return fetch(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`)
    .then(response => {
        if(!response.ok)
            throw new Error("Error in fetch ", response.statusText);

        return response.json();
    })
}
