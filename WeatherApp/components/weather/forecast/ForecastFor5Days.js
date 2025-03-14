import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { getForecastForFiveDays } from "../../../api";
import { useEffect, useState } from "react";
import UserLocation from "../../Location/UserLocation";
import { calculateAverigeValuesForFiveDays, getDailyForecast } from "./DataEdit";
import ForecastFlatList from "./ForecastFlatList16days";
import ForecastFlatList5 from "./ForecastFlatList5days";


//TODO: figure out how to get daily temperature for five days
export default function ForecastForFiveDays() {

    const [forecastFiveDays, setForecastFiveDays] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([])
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [location, setLocation] = useState('');

    const handleLocationFetched = (location) => {
        setLocation(location);
    };

    useEffect(() => {
        if (location) {
            handleFetch();
        }
    }, [location]); //ensures that location is downloaded before the fetch

    const handleFetch = () => {
        getForecastForFiveDays(location)
            .then(data => {
                //TO DO: continue working on daily weather and use Flatlist to show (daily) and (hourly) weather data on Forecast.js
                const hourlyData = data.list.map(item => ({
                    date: item.dt_txt,
                    temp: Math.round(item.main.temp),
                    feelsLike: Math.round(item.main.feels_like),
                    weatherIcon: Math.round(item.weather[0].icon),
                    wind: Math.round(item.wind.speed),
                }))
                setHourlyForecast(hourlyData);
                console.log("TÄmä on hourlyData: ", hourlyForecast)

            })
            .catch(err => console.error("Error in fetch: ", err));
    }

    return (
        <View style={styles.container}>
            <UserLocation onLocationFetched={handleLocationFetched} />
            <Text>5 day Forecast</Text>
            <ForecastFlatList5 />

            {/* <Text>Loading...</Text> */}

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})