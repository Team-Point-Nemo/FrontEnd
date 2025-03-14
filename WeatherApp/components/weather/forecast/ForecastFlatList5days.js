import { FlatList, View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";

export default function ForecastFlatList5({ hourlyForecast, dailyForecast }) {
    return (
        <View>
            <FlatList 
                data={dailyForecast}
                renderItem={({ item }) => (
                    <View style={styles.daily}>
                        <Text variant="labelMedium">{item.date}</Text>
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
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
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
    }
})