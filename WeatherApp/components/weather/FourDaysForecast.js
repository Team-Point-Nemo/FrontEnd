import { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForecastForFourDays } from "../../api";
import { FourDaysDaily } from "./FourDaysDaily";
import { FourDaysHourly } from "./FourDaysHourly";


export default function FourDaysForecast() {

    const [forecast, setForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState(
        [ { date: "27.2.", temp: "+3°", wind: "5 m/s" },
            { date: "28.2.", temp: "+2°", wind: "4 m/s" },
            { date: "29.2.", temp: "+1°", wind: "3 m/s" },
            { date: "1.3.", temp: "0°", wind: "2 m/s" }
        ]);


    const [hourlyForeCast, setHourlyForecast] = useState([
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getForecastForFourDays()
            .then((data) => {
                console.log("Fetched data:", data);

                //processed data for four days 
                const dailyData = {};
                const hourlyData = {};

                //loop through every item and saves the maximum
                data.list.forEach(item => {
                    const date = item.dt_txt.split(" ")[0];
                    const time = item.dt_txt.split(" ")[1].slice(0, 5); // Ota vain tunnit ja minuutit
                    if (!dailyData[date]) {
                        dailyData[date] = { maxTemp: -Infinity, maxWind: -Infinity };
                    }

                    dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp_max);
                    dailyData[date].maxWind = Math.max(dailyData[date].maxWind, item.wind.speed);

                    if (!hourlyData[date]) {
                        hourlyData[date] = [];
                    }
                    hourlyData[date].push({
                        time: time,
                        temp: `${Math.round(item.main.temp)} °C`,
                        wind: `${Math.round(item.wind.speed)} m/s`
                    });
                    console.log("Hourly data: ", hourlyData)
                });

                //rounding result
                const formattedData = Object.keys(dailyData).map(date => ({
                    date: formatDate(date),
                    temp: `${Math.round(dailyData[date].maxTemp)} °C`,
                    wind: `${Math.round(dailyData[date].maxWind)} m/s`
                }))

                setDailyForecast(formattedData);
                  console.log("Processed hourly data:", hourlyData); // Tulostetaan, mitä tallennetaan
                setHourlyForecast(hourlyData);
            })
            .catch(err => console.log(err));
    };

    //example ("2024-02-27" → "27.2.")
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.getDate()}.${date.getMonth() +1}.`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <FourDaysHourly hourlyForecast={hourlyForeCast} />
            <FourDaysDaily dailyForecast={dailyForecast}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    forecast: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})