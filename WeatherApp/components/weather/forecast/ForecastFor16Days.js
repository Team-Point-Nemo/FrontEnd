import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getLongTermForecast } from "../../../api";
import { mapForecastData } from "./DataEdit";
import { ActivityIndicator } from "react-native-paper";
import ForecastFlatList from "./ForecastFlatList16days";

export default function ForecastFor16Days({ location }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      handleFetch();
    }
  }, [location]); // Ensures that location is downloaded before the fetch.

  const handleFetch = () => {
    getLongTermForecast(location)
      .then((data) => {
        const mappedForecast = mapForecastData(data);
        setForecast(mappedForecast);
      })
      .catch((err) => console.error("Error in fetch: ", err));
  };

  return (
    <View style={styles.container}>
      {forecast ? (
        <ForecastFlatList forecast={forecast} />
      ) : (
        <ActivityIndicator animating={true} size="large" color="white" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
