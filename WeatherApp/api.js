const lat = 60.1674881;
const lon = 24.9427473;

const FOUR_DAYS_API_URL = process.env.EXPO_PUBLIC_FOUR_DAYS_API_URL;

export function getWeatherInHelsinki() {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&${process.env.WEATHER_API_KEY}`)
    // HUOM. API_KEY täytyy laittaa selkokielisenä (ei muuttujana, vaan suoraan tekstinä), koska avain on salainen.
    // HUOM. EI SAA PUSHATA GITHUBIIN SELLAISENA VERSIONA!!!!! vaan muuttujan kanssa
    .then(response => {
        if(!response.ok)
            throw new Error("Error in fetch", response.statusText);

        return response.json();
    });
}


export function getForecastForFourDays() {
    return fetch(`${FOUR_DAYS_API_URL}/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=3160e87e946ae433ae6bd60d17de5edd&units=metric`)
    // return fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
    .then(response => {
        if(!response.ok)
            throw new Error("Error in fetch", response.statusText);

        return response.json();
    })
}