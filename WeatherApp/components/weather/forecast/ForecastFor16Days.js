import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import UserLocation from "../../Location/UserLocation";
import { getLongTermForecast } from "../../../api";
import ForecastFlatList from "./ForecastFlatList16days";
import { mapForecastData } from "./DataEdit";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

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
    }, [location]);     // Ensures that location is downloaded before the fetch.

    const handleFetch = () => {
        getLongTermForecast(location)
            .then(data => {
                const mappedForecast = mapForecastData(data);
                setForecast(mappedForecast);
                //console.log("Mapped:", forecast);
            })
            .catch(err => console.error("Error in fetch: ", err));
    }


    return (
        <View style={styles.container}>
            <UserLocation onLocationFetched={handleLocationFetched} />
            {forecast ? (
                <ForecastFlatList forecast={forecast} />
            ) : (
                <ActivityIndicator animating={true} size="large" color={MD2Colors.black} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})