import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { getForecastForFiveDays } from "../../../api";
import { useEffect, useState } from "react";
import UserLocation from "../../Location/UserLocation";
import ForecastFlatList5 from "./ForecastFlatList5days";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function ForecastForFiveDays() {

    const [dailyForecast, setDailyForecast] = useState([{}])
    const [hourlyForecast, setHourlyForecast] = useState([{}]);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLocationFetched = (location) => {
        setLocation(location);
    };

    useEffect(() => {
        if (location) {
            handleFetch();
        }
    }, [location]); //ensures that location is downloaded before the fetch

    const handleFetch = () => {
        setLoading(true);
        getForecastForFiveDays(location)
            .then(data => {
                const hourlyData = data.list.map(item => {

                    const date = item.dt_txt.split(" ")[0]; //YYYY-MM-DD
                    const hourData = item.dt_txt.split(" ")[1].slice(0, 5); //HH:MM

                    return{
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
            })
            .catch(err => console.error("Error in fetch: ", err))
            .finally(() => setLoading(false));
    }


    return (
        <View style={styles.container}>
            <UserLocation onLocationFetched={handleLocationFetched} />
            {loading ? ( 
            <ActivityIndicator animating={true} size="large" color={MD2Colors.black} />
        ) : (
            <ForecastFlatList5 dailyForecast={dailyForecast} hourlyForecast={hourlyForecast} />
        )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})