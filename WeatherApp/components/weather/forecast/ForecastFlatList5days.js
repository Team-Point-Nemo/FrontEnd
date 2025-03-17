import { useState } from "react";
import { FlatList, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';


export default function ForecastFlatList5({ hourlyForecast, dailyForecast }) {

    const [selectedDate, setSelectedDate] = useState("");

    const handleDatePress = (date) => {
        if (selectedDate === date) {
            setSelectedDate("");
        } else {
            setSelectedDate(date);
        }
    };

    const getHourlyData = (date) => {
        const hourlyDataForDate = hourlyForecast.filter((hour) => hour.date.includes(date));
        console.log("Flatlist: ", hourlyDataForDate);
        return hourlyDataForDate;
    };

    return (
        <View>
            <FlatList
                data={dailyForecast}
                renderItem={({ item }) => (
                    <View style={styles.daily}>
                        <TouchableOpacity onPress={() => handleDatePress(item.date)}>
                            <Text variant="labelMedium">{item.date}</Text>
                        </TouchableOpacity>
                        <View>
                            <Text variant="labelMedium">Temp</Text>
                            <Text variant="labelMedium">{item.temp} °C</Text>
                        </View>
                        <View>
                            <Text variant="labelMedium">Feels like</Text>
                            <Text variant="labelMedium">{item.feelsLike} °C</Text>
                        </View>
                        <Text variant="labelMedium">{item.wind} m/s</Text>
                        <Image
                            style={styles.weatherIcon}
                            source={{ uri: `http://openweathermap.org/img/wn/${item.weatherIcon}.png` }}
                        />
                        <MaterialIcons
                            name= {selectedDate === item.date  ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={24}
                            color='black'
                        />


                        {/* TODO: Make hourly weather to be seen when clicked  */}


                        {selectedDate === item.date && (
                            <FlatList
                                data={getHourlyData(item.date)}
                                keyExtractor={(hourItem) => hourItem.date}
                                renderItem={({ item: hour }) => (
                                    <View style={styles.hourly}>
                                        <Text variant="labelMedium">{hour.date}</Text>
                                        <Text variant="labelMedium">Temp: {hour.temp} °C</Text>
                                        <Text variant="labelMedium">Feels like: {hour.feelsLike} °C</Text>
                                        <Text variant="labelMedium">Wind: {hour.wind} m/s</Text>
                                        <Image
                                            style={styles.weatherIcon}
                                            source={{ uri: `http://openweathermap.org/img/wn/${hour.weatherIcon}.png` }}
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
    },
    daily: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#565254",
    },
    weatherIcon: {
        width: 50,
        height: 50,
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