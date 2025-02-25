const lat = 60.1674881;
const lon = 24.9427473;

export function getWeatherInHelsinki() {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3d87bae887c82a2c3312c81b6f321a20`)
    // HUOM. API_KEY täytyy laittaa selkokielisenä (ei muuttujana, vaan suoraan tekstinä), koska avain on salainen.
    // HUOM. EI SAA PUSHATA GITHUBIIN SELLAISENA VERSIONA!!!!! vaan muuttujan kanssa
    .then(response => {
        if(!response.ok)
            throw new Error("Error in fetch", response.statusText);

        return response.json();
    });
}