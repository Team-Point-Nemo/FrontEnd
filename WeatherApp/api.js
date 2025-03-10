export function getCurrentWeatherInLocation(location) {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${process.env.WEATHER_API_KEY}`)
    // HUOM. API_KEY täytyy laittaa selkokielisenä (ei muuttujana, vaan suoraan tekstinä), koska avain on salainen.
    // HUOM. EI SAA PUSHATA GITHUBIIN SELLAISENA VERSIONA!!!!! vaan muuttujan kanssa
    .then(response => {
        if(!response.ok)
            throw new Error('Error in getting local weather', response.statusText);

        return response.json();
    });
}

export function getWeatherByCity(city) {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Error in fetch", response.statusText);
        }
        return response.json();
    })
}

export function getForecastForFourDays(location) {
return fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
    .then(response => {
        if(!response.ok)
            throw new Error("Error in fetch", response.statusText);

        return response.json();
    })
}