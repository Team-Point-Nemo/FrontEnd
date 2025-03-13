export const mapForecastData = (data) => {

    return data.list.map(item => ({
        dt: new Date(item.dt*1000).toLocaleDateString('fi-FI', { day : '2-digit', month: '2-digit'}),
        tempDay: Math.round(item.temp.day),
        feelsLikeDay: Math.round(item.feels_like.day),
        wind: Math.round(item.speed),
        weatherIcon: item.weather[0].icon,
    }));
};