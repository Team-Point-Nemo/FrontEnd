import { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForecastForFourDays } from "../../api";
import { MaterialIcons } from '@expo/vector-icons';
import { forecastMockupData } from "./ForecastMockupData";


export default function FourDaysForecast() {

    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForeCast, setHourlyForecast] = useState([]);
    const [expandedDays, setExpandedDays] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        //from api.js, returns the hourly weather forecast for four days
        getForecastForFourDays()
            .then((data) => {
                console.log("Fetched data:", data);
                //processed data for four days 
                const dailyData = {};
                const hourlyData = {};

                //loops through every item and saves the maximum
                data.list.forEach(item => {
                    const date = item.dt_txt.split(" ")[0];
                    const time = item.dt_txt.split(" ")[1].slice(0, 5); // takes only hours and minutes
                    if (!dailyData[date]) {
                        //initialize with infinity since the temperature can be negative
                        dailyData[date] = { maxTemp: -Infinity, maxWind: -Infinity };
                    }

                    //updates the maximum temperature and wind speed for the date
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

                //returns an array of dates (keys) and maps each date to the correct format
                const formattedData = Object.keys(dailyData).map(rawDate => ({ //rawdate "2024-02-27"
                    rawDate,
                    date: formatDate(rawDate), //formatted 27.2.
                    temp: `${Math.round(dailyData[rawDate].maxTemp)} °C`,
                    wind: `${Math.round(dailyData[rawDate].maxWind)} m/s`
                }))

                setDailyForecast(formattedData);
                console.log("Processed hourly data:", hourlyData);
                setHourlyForecast(hourlyData);
                setIsDataLoaded(true); 
            })
            .catch((err) => {
                console.error("Fetch error: ", err);
                // if fetch fails, uses mockup data
                console.log('Using mockup data...');
                const dailyData = Object.keys(forecastMockupData).map(date => {

                    const dayData = forecastMockupData[date];
                    console.log(`Day data for ${date}:`, dayData);
            
                    const maxTemp = Math.max(...dayData.map(item => parseFloat(item.temp)));
                    const maxWind = Math.max(...dayData.map(item => parseFloat(item.wind)));
            
                    // returns a new object with maximum values
                    return {
                        rawDate: date,
                        date: formatDate(date),
                        temp: `${Math.round(maxTemp)} °C`,
                        wind: `${Math.round(maxWind)} m/s`
                    };
                });
                setDailyForecast(dailyData);
                setHourlyForecast(forecastMockupData);
                setIsDataLoaded(true);
            });
    };

    //example ("2024-02-27" → "27.2.")
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.getDate()}.${date.getMonth() + 1}.`;
    };

    //called when a user click a date. prev = state before updating (includes state for expandedDays)
    const toggleExpand = (rawDate) => {
        setExpandedDays(prev => ({
            ...prev,
            [rawDate]: !prev[rawDate] //toggles the state of the date that the user has selected. If it was true (expanded), it changes to false (collapsed)
        }));
    };

    return (
        <SafeAreaView style={styles.container}>
            {isDataLoaded ? (
                <FlatList
                    data={dailyForecast}
                    keyExtractor={(item) => item.rawDate}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => toggleExpand(item.rawDate)}
                                style={styles.daily}
                            >
                                <Text>{item.date}</Text>
                                <Text>{item.temp}</Text>
                                <Text>{item.wind}</Text>
                                <MaterialIcons
                                    name={expandedDays[item.rawDate] ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                    size={24}
                                    color='black'
                                />
                            </TouchableOpacity>
                            {expandedDays[item.rawDate] && (
                                <FlatList
                                    data={hourlyForeCast[item.rawDate] || []}
                                    keyExtractor={(hour) => hour.time}
                                    renderItem={({ item }) => (
                                        <View style={styles.hourly}>
                                            <Text>{item.time}</Text>
                                            <Text>{item.temp}</Text>
                                            <Text>{item.wind}</Text>
                                        </View>
                                    )}
                                />
                            )}
                        </View>
                    )}
                />
            ) : (
                <Text>Loading data...</Text> 
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%'
    },
    forecast: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    daily: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#565254",
    },
    hourly: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
})