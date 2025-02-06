const lat = 60.1674881;
const lon = 24.9427473;

export function getWeatherInHelsinki() {
    return fetch(`${process.env.CURRENT_WEATHER_DATA_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
    .then(response => {
        if(!rersponse.ok)
            throw new Error("Error in fetch", response.statusText);

        return response.json();
    });
}