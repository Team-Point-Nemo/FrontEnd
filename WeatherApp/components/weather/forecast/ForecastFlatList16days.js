import { FlatList, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";

export default function ForecastFlatList({ forecast }) {


    return (
        <View style={styles.container}>
            <FlatList
                scrollEnabled={false}
                data={forecast}
                renderItem={({ item }) => (
                    <View style={styles.daily}>
                        <Text variant="titleSmall">{item.dt}</Text>
                        <View>
                            <Text variant="titleSmall">Temp</Text>
                            <Text variant="titleSmall">{item.tempDay} °C</Text>
                        </View>
                        <View>
                            <Text variant="titleSmall">Feels like</Text>
                            <Text variant="titleSmall">{item.feelsLikeDay} °C</Text>
                        </View>
                        <Text variant="titleSmall">{item.wind} m/s</Text>
                        <Image
                            style={styles.weatherIcon}
                            source={{ uri: `http://openweathermap.org/img/wn/${item.weatherIcon}.png` }}
                        />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -5,
    },
    daily: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        margin: 10,
        marginTop: -6,
        borderRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: "white",
    },
    weatherIcon: {
        width: 50,
        height: 50,
    }
})