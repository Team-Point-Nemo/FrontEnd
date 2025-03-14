//16 day forecast
export const mapForecastData = (data) => {

    return data.list.map(item => ({
        dt: new Date(item.dt*1000).toLocaleDateString('fi-FI', { day : '2-digit', month: '2-digit'}),
        tempDay: Math.round(item.temp.day),
        feelsLikeDay: Math.round(item.feels_like.day),
        wind: Math.round(item.speed),
        weatherIcon: item.weather[0].icon,
    }));
};


// 12:00 daily values
export const getDailyForecast = (data) => {
    const dailyForecast = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const formattedDate = date.toLocaleDateString('fi-FI', { day: '2-digit', month: '2-digit' });
        const hours = date.getHours();

        if (hours === 12) {
            dailyForecast[formattedDate] = {
                dt: formattedDate, 
                tempDay: Math.round(item.main.temp),
                feelsLikeDay: Math.round(item.main.feels_like),
                wind: Math.round(item.wind.speed),
                weatherIcon: item.weather[0].icon
            };
        }
    });

    return Object.values(dailyForecast);
};

//5 Day daily
export const mapForecastDailyDataForFiveDays= (data) => {
    return data.list.slice(0,5).map(item => ({
        dt: new Date(item.dt*1000).toLocaleDateString('fi-FI', { day : '2-digit', month: '2-digit'}),
        tempDay: Math.round(item.temp.day),
        feelsLikeDay: Math.round(item.feels_like.day),
        wind: Math.round(item.speed),
        weatherIcon: item.weather[0].icon,
    }));
}
//for 5 days forecast
export const calculateAverigeValuesForFiveDays = (data) => {

    const dailyData = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!dailyData[date]) {
            dailyData[date] = { 
                tempSum: 0, 
                feelsLikeSum: 0, 
                windSum: 0, 
                count: 0,
                weatherIcons: {} 
            };
        }

        dailyData[date].tempSum += item.main.temp;
        dailyData[date].feelsLikeSum += item.main.feels_like;
        dailyData[date].windSum += item.wind.speed;
        dailyData[date].count += 1;

        const icon = item.weather[0].icon;
        dailyData[date].weatherIcons[icon] = (dailyData[date].weatherIcons[icon] || 0) + 1;
    });

    return Object.keys(dailyData).map(date => {
        const day = dailyData[date];
        const mostCommonIcon = Object.keys(day.weatherIcons).reduce((a, b) => 
            day.weatherIcons[a] > day.weatherIcons[b] ? a : b
        );

        return {
            date,
            avgTemp: (day.tempSum / day.count).toFixed(2),
            avgFeelsLike: (day.feelsLikeSum / day.count).toFixed(2),
            avgWind: (day.windSum / day.count).toFixed(2),
            icon: mostCommonIcon
        };
    });
};