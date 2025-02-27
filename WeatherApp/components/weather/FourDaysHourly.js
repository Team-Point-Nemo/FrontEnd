import { Text, SafeAreaView, View, FlatList, StyleSheet } from "react-native";

export function FourDaysHourly({ hourlyForecast }) {

    return (

        <SafeAreaView>
            <Text>Hourly</Text>
            {Object.keys(hourlyForecast).map((date) => (
                <View key={date}>
                    <Text>{date}</Text>
                    <FlatList
                        data={hourlyForecast[date]}
                        // horizontal
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.time}</Text>
                                <Text>{item.temp}</Text>
                                <Text>{item.wind}</Text>
                            </View>
                        )}
                    />
                </View>
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    dayContainer: {
        marginBottom: 15
    },
    forecast: {
        marginHorizontal: 5,
        padding: 10,
        alignItems: "center"
    }
});