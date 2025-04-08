import { StyleSheet } from "react-native";
import { getForecastForFiveDays } from "../../../api";
import { useEffect, useState } from "react";
import ForecastFlatList5 from "./ForecastFlatList5days";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForecastForFiveDays({ location }) {

    const [dailyForecast, setDailyForecast] = useState(null)
    const [hourlyForecast, setHourlyForecast] = useState(null);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            handleFetch();
        }
    }, [location]);     // Ensures that location is downloaded before the fetch

    const handleFetch = () => {
        getForecastForFiveDays(location)
            .then(data => {
                const hourlyData = data.list.map(item => {

                    const date = item.dt_txt.split(" ")[0];     // YYYY-MM-DD
                    const hourData = item.dt_txt.split(" ")[1].slice(0, 5);     // HH:MM

                    return {
                        date: date,
                        hour: hourData,
                        temp: Math.round(item.main.temp),
                        feelsLike: Math.round(item.main.feels_like),
                        weatherIcon: item.weather[0].icon,
                        wind: Math.round(item.wind.speed),
                    }
                })
                setHourlyForecast(hourlyData);


                const dailyData = hourlyData
                    .filter(item => item.hour === "15:00")
                    .map(item => ({
                        ...item
                    }))

                setDailyForecast(dailyData);

                const today = hourlyData
                    .filter(item => item.hour === "18:00")
            })
            .catch(err => console.error("Error in fetch: ", err))
    }

    return (
        <SafeAreaView style={styles.container}>
            {dailyForecast && hourlyForecast ? (
                <ForecastFlatList5 dailyForecast={dailyForecast} hourlyForecast={hourlyForecast} />
            ) : (
                <ActivityIndicator animating={true} size="large" color={MD2Colors.black} />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})