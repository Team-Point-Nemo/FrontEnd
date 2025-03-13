import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text } from 'react-native-paper';
import UserLocation from "../../Location/UserLocation";
import { getLongTermForecast } from "../../../api";
import ForecastFlatList from "./ForecastFlatList";
import { mapForecastData } from "./DataEdit";

export default function ForecastFor16Days() {

    const [forecast, setForecast] = useState(null);
    const [location, setLocation] = useState('');


    const handleLocationFetched = (location) => {
        setLocation(location);
    };

    useEffect(() => {
        if (location) {
            handleFetch();
        }
    }, [location]); //ensures that location is downloaded before the fetch

    const handleFetch = () => {
        getLongTermForecast(location)
            .then(data => {
                const mappedForecast = mapForecastData(data);
                setForecast(mappedForecast);
                console.log("Mapped:", forecast);
            })
            .catch(err => console.error("Error in fetch: ", err));
    }


    return (
        <SafeAreaView style={styles.container}>
            <UserLocation onLocationFetched={handleLocationFetched} />
            {forecast && forecast.length > 0 ? (
               
                <ForecastFlatList forecast={forecast} />
            ) : (
                <Text>Loading</Text>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})