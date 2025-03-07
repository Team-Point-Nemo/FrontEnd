import { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getForecastForFourDays } from "../../api";
import { MaterialIcons } from '@expo/vector-icons';


export default function FourDaysForecast() {

    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForeCast, setHourlyForecast] = useState([]);
    const [expandedDays, setExpandedDays] = useState({});

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
                const formattedData = Object.keys(dailyData).map(rawDate => ({ //rawdate "2024-02-27"
                    rawDate,
                    date: formatDate(rawDate), //formatted 27.2.
                    temp: `${Math.round(dailyData[rawDate].maxTemp)} °C`,
                    wind: `${Math.round(dailyData[rawDate].maxWind)} m/s`
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

    const toggleExpand = (rawDate) => {
        setExpandedDays(prev => ({
            ...prev,
            [rawDate] : !prev[rawDate]
        }));
    };

    return (
        <SafeAreaView style={styles.container}>
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
        borderBottomColor: "#ccc",
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