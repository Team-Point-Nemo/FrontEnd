import { useState } from "react";
import useWeather from "../../hooks/useWeather";
import useUserLocation from "../../hooks/useUserLocation";
import useCitySearch from "../../hooks/useCitySearch";
import useCityName from "../../hooks/useCityName";
import useRecentSearch from "../../hooks/useRecentSearch";
import Forecast from './forecast/Forecast';
import { getCurrentDate, setImageByTime } from "../date/DateService";
import { Text, Searchbar, FAB } from "react-native-paper";
import { StyleSheet, SafeAreaView, Image, View, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import FavoriteIconButton from "../favorites/FavoriteIconButton";

export default function NewWeatherNow() {

  const { location: userLocation, loading } = useUserLocation();
  const { searchLocation, searchCity } = useCitySearch();

  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState("user");
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const location = mode == "user" ? userLocation : searchLocation;

  const { weather } = useWeather(location);

  const { city } = useCityName(location);

  const { recentCities, updateRecentCities, dismisCityList } = useRecentSearch();

  const handleSearch = async () => {
    await searchCity(searchQuery); // Calls the hook to get the coordinates
    await updateRecentCities(searchQuery)
    setMode("search")
    // setSearch(true); tsekkaa nää viel!
    setSearchQuery("");
  };

  const handleRecentCitySelect = async () => {
    await searchCity(city)
    await updateRecentCities(city)
    setMode("search")
    setSearchQuery("")
    setIsSearchFocused(false)
  }


  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dismisCityList}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.flexContainer1}>
            <ImageBackground
              source={setImageByTime()}
              style={styles.image}>

              <SafeAreaView style={styles.image}>
                <View style={styles.cityContainer}>
                  <View style={styles.cityLeft}>
                    {city ? (
                      <Text variant="displayMedium" style={styles.textWithShadow}>{city}</Text>
                    ) : (
                      <ActivityIndicator animating={true} size="large" color={MD2Colors.black} />
                    )}
                    <Text variant="titleLarge" style={styles.textWithShadow}>{getCurrentDate()}</Text>
                  </View>
                  <View style={styles.cityRigth}>
                    <FAB
                      variant='surface'
                      icon='map-marker'
                      size={10}
                      style={styles.fab}
                      onPress={() => {
                        setMode("user");
                      }}
                    />
                  </View>
                </View>

                {weather?.main && (   // Checks, that weather has values before rendering.
                  <View style={styles.weatherContainer}>
                    <View style={styles.columnLeft}>
                      <Text variant="displayLarge" style={styles.textWithShadow}>{Math.round(weather.main.temp)}°</Text>
                      {weather?.weather?.icon ? (
                        <Image
                          style={styles.weatherIcon}
                          source={{ uri: `http://openweathermap.org/img/wn/${weather.weather.icon}.png` }}
                        />
                      ) : null}
                    </View>
                    <View style={styles.columnRight}>
                      <Text variant="titleMedium" style={styles.textWithShadow}>Feels like: {Math.round(weather.main.feels_like)}°</Text>
                      <Text variant="titleMedium" style={styles.textWithShadow}>Wind speed: {Math.round(weather.wind.speed)} m/s</Text>
                    </View>
                  </View>
                )}
              </SafeAreaView>
            </ImageBackground>

            <View style={styles.locationContainer}>
              <Searchbar
                loading={searchLoading}
                inputStyle={{ fontSize: 14 }}
                elevation={3}
                placeholder="Search city..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                onIconPress={handleSearch}
                onSubmitEditing={handleSearch}
                style={styles.searchbar}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </View>
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
        </ScrollView>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer1: {
    flex: 1,
    width: '100%',
  },
  flexContainer2: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 20,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25
  },
  cityLeft: {
    alignItems: 'flex-end'
  },
  cityRigth: {
    marginLeft: 20
  },
  columnLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnRight: {
    flex: 1,
  },
  fab: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWithShadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 1
    },
  },
  searchbar: {
    width: '100%',
  },
  weatherContainer: {
    padding: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 70,
    height: 70,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 1
    },
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginHorizontal: 30,
    marginTop: 20,
  },
  recentCitiesList: {
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
  },
  recentCityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recentCityText: {
    fontSize: 16,
    color: '#333',
  },
});