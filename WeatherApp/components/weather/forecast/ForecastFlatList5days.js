import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForecastFlatList5({ hourlyForecast, dailyForecast }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredHourlyData, setFilteredHourlyData] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        if (selectedDate) {
            const filteredData = hourlyForecast.filter((item) => item.date === selectedDate);
            setFilteredHourlyData(filteredData);
        }
    }, [selectedDate, hourlyForecast]);

    const handlePress = (date) => {
        if (selectedDate === date) {
            setSelectedDate(null);
        } else {
            setSelectedDate(date);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.getDate()}.${date.getMonth() + 1}.`;
    };

    return (
        <FlatList
            scrollEnabled={false}
            style={styles.container}
            data={dailyForecast}
            renderItem={({ item }) => (
                <View style={styles.daily}>
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
                            style={styles.arrowIcon}
                            name={selectedDate === item.date ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                            size={24}
                            color={theme.colors.onSurface}
                        />
                    </TouchableOpacity>

                    {selectedDate === item.date && (
                        <FlatList
                            scrollEnabled={false}
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
    );
}

const styles = StyleSheet.create({
    arrowIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 30,
    },
    container: {
        marginTop: -52,
        marginBottom: -40,
    },
    daily: {
        borderRadius: 15,
        padding: 10,
        margin: 10,
        marginTop: -6,
        borderBottomWidth: 1,
        borderBottomColor: "white",
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