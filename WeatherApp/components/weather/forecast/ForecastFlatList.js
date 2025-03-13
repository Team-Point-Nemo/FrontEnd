import { FlatList, SafeAreaView, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";

export default function ForecastFlatList({ forecast }) {


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={forecast}
                renderItem={({ item }) => (
                    <View style={styles.daily}>
                        <Text variant="labelMedium">{item.dt}</Text>
                        <View>
                            <Text variant="labelMedium">Temp</Text>
                            <Text variant="labelMedium">{item.tempDay} °C</Text>
                        </View>
                        <View>
                            <Text variant="labelMedium">Feels like</Text>
                            <Text variant="labelMedium">{item.feelsLikeDay} °C</Text>
                        </View>
                        <Text variant="labelMedium">{item.wind} m/s</Text>
                        <Image
                            style={styles.weatherIcon}
                            source={{ uri: `http://openweathermap.org/img/wn/${item.weatherIcon}.png` }}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    )
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