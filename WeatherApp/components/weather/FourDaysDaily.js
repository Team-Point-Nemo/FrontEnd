import { FlatList, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function FourDaysDaily({ dailyForecast }) {

    return (
        <SafeAreaView style={styles.container}>
            <Text>4 päivän ennuste</Text>
            <FlatList
                data={dailyForecast}
                renderItem={({ item }) => (
                    <View style={styles.forecast}>
                        <Text>{item.date}</Text>
                        <Text>{item.temp}</Text>
                        <Text>{item.wind}</Text>
                    </View>
                )}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    forecast: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
    }
})