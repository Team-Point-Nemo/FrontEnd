import { StyleSheet, SafeAreaView } from "react-native";
import WeatherNow from "../components/weather/WeatherNow";
import CitySearch from "../components/location/CitySearch";
import { useRoute } from "@react-navigation/native";

export default function IndexScreen() {

  const route = useRoute();
  const { searchedCity, weather } = route.params || {};
  
  console.log("Params to index screen: ", searchedCity, weather)

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
