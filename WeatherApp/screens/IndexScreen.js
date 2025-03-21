import { StyleSheet, SafeAreaView } from "react-native";
import WeatherNow from "../components/weather/WeatherNow";
import CitySearch from "../components/Location/CitySearch";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

export default function IndexScreen() {

  const route = useRoute();
  const { searchedCity, weather } = route.params || {};
  console.log("Params received in index screen: ", route.params)

  return (
    <SafeAreaView style={styles.container}>
      {searchedCity && weather ? (
        <CitySearch searchedCity={searchedCity} weather={weather} />
      ) : (<WeatherNow />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
