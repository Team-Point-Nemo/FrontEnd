export function getCurrentWeatherInLocation(location) {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=b74779bdf87fc91c8f995e35e0437ec8`)
    // HUOM. API_KEY täytyy laittaa selkokielisenä (ei muuttujana, vaan suoraan tekstinä), koska avain on salainen.
    // HUOM. EI SAA PUSHATA GITHUBIIN SELLAISENA VERSIONA!!!!! vaan muuttujan kanssa
    .then(response => {
        if(!response.ok)
            throw new Error('Error in getting local weather', response.statusText);

        return response.json();
    });
}

export function getWeatherByCity(city) {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?q=${city}&appid=b74779bdf87fc91c8f995e35e0437ec8`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Error in fetch", response.statusText);
        }
        return response.json();
    })
}

//Forecast for 4 days https://openweathermap.org/api/hourly-forecast
export function getForecastForFourDays(location) {
return fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=b74779bdf87fc91c8f995e35e0437ec8&units=metric`)
    .then(response => {
        if(!response.ok)
            throw new Error("Error in fetch", response.statusText);

        return response.json();
    })
}


//forecast for 16 days https://openweathermap.org/forecast16
export function getForecastFor16Days(location){
return fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${location.coords.latitude}&lon=${location.coords.longitude}&cnt=16&appid=b74779bdf87fc91c8f995e35e0437ec8&units=metric`)
    .then(response => {
        if(!response.ok)
                throw new Error("Error in fetch ", response.statusText);

        return response.json()
    })
}