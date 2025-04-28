import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { getCurrentDate, setImageByTime } from "../date/DateService";
import { Text, Searchbar, FAB } from "react-native-paper";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";
import useWeather from "../../hooks/useWeather";
import useUserLocation from "../../hooks/useUserLocation";
import useCitySearch from "../../hooks/useCitySearch";
import useCityName from "../../hooks/useCityName";
import useRecentSearch from "../../hooks/useRecentSearch";
import Forecast from "./forecast/Forecast";
import FavoriteIconButton from "../favorites/FavoriteIconButton";

export default function WeatherIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState("user");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { location: userLocation } = useUserLocation();
  const { searchLocation, searchCity } = useCitySearch();
  const location = mode == "user" ? userLocation : searchLocation;

  const { weather } = useWeather(location);

  const { city } = useCityName(location);

  const { recentCities, updateRecentCities } = useRecentSearch();

  const route = useRoute();
  const { selectedFavorite } = route.params || {};

  const handleSearch = async () => {
    const success = await searchCity(searchQuery); // Calls the hook to get the coordinates
    if (success) {
      await updateRecentCities(searchQuery);
    }
    dismissCityList();
    setSearchQuery("");
    setMode("search");
  };

  const handleRecentCitySelect = async (city) => {
    const success = await searchCity(city);
    if (success) {
      await updateRecentCities(city);
    }
    dismissCityList();
    setSearchQuery("");
    setMode("search");
  };

  const dismissCityList = () => {
    setIsSearchFocused(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (selectedFavorite) {
      setMode("search");
      searchCity(selectedFavorite);
    }
  }, [selectedFavorite]);

  return (
    <TouchableWithoutFeedback onPress={dismissCityList}>
      <View style={{ flex: 1 }}>
        <View style={styles.flexContainer1}>
          <ImageBackground source={setImageByTime()} style={styles.image}>
            <View style={styles.favoriteRight}>
              <FavoriteIconButton city={city} />
            </View>

            {/* City name, date and weather */}
            <SafeAreaView style={styles.image}>
              <View style={styles.cityContainer}>
                <View style={styles.cityLeft}>
                  {city ? (
                    <Text variant="displayMedium" style={styles.textWithShadow}>
                      {city}
                    </Text>
                  ) : (
                    <ActivityIndicator
                      animating={true}
                      size="large"
                      color="white"
                    />
                  )}
                  <Text variant="titleLarge" style={styles.textWithShadow}>
                    {getCurrentDate()}
                  </Text>
                </View>
                <View style={styles.cityRight}>
                  <FAB
                    variant="surface"
                    icon="map-marker"
                    size={10}
                    style={styles.fab}
                    onPress={() => {
                      setMode("user");
                    }}
                  />
                </View>
              </View>

              {weather?.main && ( // Checks, that weather has values before rendering.
                <View style={styles.weatherContainer}>
                  <View style={styles.columnLeft}>
                    <Text variant="displayLarge" style={styles.textWithShadow}>
                      {Math.round(weather.main.temp)}°
                    </Text>
                    {weather?.weather?.icon ? (
                      <Image
                        style={styles.weatherIcon}
                        source={{
                          uri: `http://openweathermap.org/img/wn/${weather.weather.icon}.png`,
                        }}
                      />
                    ) : null}
                  </View>
                  <View style={styles.columnRight}>
                    <Text variant="titleMedium" style={styles.textWithShadow}>
                      Feels like: {Math.round(weather.main.feels_like)}°
                    </Text>
                    <Text variant="titleMedium" style={styles.textWithShadow}>
                      Wind speed: {Math.round(weather.wind.speed)} m/s
                    </Text>
                  </View>
                </View>
              )}
            </SafeAreaView>
          </ImageBackground>

          {/* Search city */}
          <View style={styles.locationContainer}>
            <Searchbar
              inputStyle={{ fontSize: 16 }}
              elevation={3}
              placeholder="Search city..."
              placeholderTextColor="#333"
              onChangeText={setSearchQuery}
              value={searchQuery}
              onIconPress={handleSearch}
              onSubmitEditing={handleSearch}
              style={styles.searchbar}
              onFocus={() => setIsSearchFocused(true)}
            />
          </View>

          {/* List for recently searched cities */}
          {isSearchFocused && recentCities.length > 0 && (
            <View style={styles.recentCitiesList}>
              {recentCities.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentCityItem}
                  onPress={() => handleRecentCitySelect(item)}
                >
                  <Text style={styles.recentCityText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.flexContainer2}>
          <Forecast location={location} />
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  flexContainer1: {
    flex: 1,
    width: "100%",
  },
  flexContainer2: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 90,
    paddingBottom: 20,
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 25,
  },
  cityLeft: {
    alignItems: "flex-end",
  },
  cityRight: {
    marginLeft: 35,
  },
  columnLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  columnRight: {
    flex: 1,
  },
  fab: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textWithShadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  searchbar: {
    width: "100%",
  },
  weatherContainer: {
    padding: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  weatherIcon: {
    width: 70,
    height: 70,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
    marginHorizontal: 30,
    marginTop: 20,
  },
  recentCitiesList: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
  },
  recentCityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  recentCityText: {
    fontSize: 16,
    color: "#333",
  },
  favoriteRight: {
    position: "absolute",
    right: 20,
    top: 43,
  },
});
