import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';

export default function ForecastFlatList5({ hourlyForecast, dailyForecast }) {

    const [filteredHourlyData, setFilteredHourlyData] = useState([]);
    const [expanded, setExpanded] = useState([]);

    useEffect(() => {
        if (expanded.length > 0) {
            const filteredData = hourlyForecast.filter((item) => expanded.includes(item.date));
            setFilteredHourlyData(filteredData);
        }
    }, [expanded, hourlyForecast]);


    const handlePress = (date) => {
        if (expanded.includes(date)){
            setExpanded(expanded.filter((day) => day !== date))
        } else {
            setExpanded([...expanded, date]);
        }
    }


    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.getDate()}.${date.getMonth() + 1}.`;
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={dailyForecast}
                renderItem={({ item }) => (
                    <View style={styles.daily}>
                        <View style={styles.dayContainer}>
                            <TouchableOpacity onPress={() => handlePress(item.date)} style={styles.touchableOpacity}>
                                <Text variant="titleSmall">{formatDate(item.date)}</Text>
                                <View>
                                    <Text variant="titleSmall">Temp</Text>
                                    <Text variant="titleSmall">{item.temp} °C</Text>
                                </View>
                                <View>
                                    <Text variant="titleSmall">Feels like</Text>
                                    <Text variant="titleSmall">{item.feelsLike} °C</Text>
                                </View>
                                <Text variant="titleSmall">{item.wind} m/s</Text>
                                <Image
                                    style={styles.weatherIcon}
                                    source={{ uri: `http://openweathermap.org/img/wn/${item.weatherIcon}.png` }}
                                />
                                <MaterialIcons
                                    name={expanded.includes(item.date) ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                    size={24}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>


                        {expanded.includes(item.date) && (
                            <FlatList
                                data={filteredHourlyData}
                                renderItem={({ item }) => (
                                    <View style={styles.hourly}>
                                        <Text variant="labelMedium">{item.hour}</Text>
                                        <Text variant="labelMedium">{item.temp} °C</Text>
                                        <Text variant="labelMedium">{item.feelsLike} °C</Text>
                                        <Text variant="labelMedium">{item.wind} m/s</Text>
                                        <Image
                                            style={styles.weatherIconHourly}
                                            source={{ uri: `http://openweathermap.org/img/wn/${item.weatherIcon}.png` }}
                                        />
                                    </View>
                                )}
                            />
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        width: '100%',
    },
    daily: {
        paddingVertical: 10,
    },
    dayContainer: {
        backgroundColor: '#D4CBE5',
        borderRadius: 20,
        padding: 10,
    },
    touchableOpacity: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    hourly: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginTop: 10,
        width:'80%',
    },
    weatherIconHourly: {
        width: 40,
        height: 20,
    }
})