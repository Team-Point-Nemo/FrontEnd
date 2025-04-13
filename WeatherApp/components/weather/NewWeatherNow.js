import { useEffect, useState } from "react";
import useWeather from "../../hooks/useWeather";
import useUserLocation from "../../hooks/useUserLocation";
import useCitySearch from "../../hooks/useCitySearch";
import useCityName from "../../hooks/useCityName";
import { getCurrentDate, setImageByTime } from "../date/DateService";
import { Text, Searchbar, FAB } from "react-native-paper";
import { StyleSheet, SafeAreaView, Image, View, ImageBackground } from "react-native";
import { StatusBar } from 'expo-status-bar';

export default function NewWeatherNow() {
    const [location, setLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    const { location: userLocation, refetchLocation } = useUserLocation();
    const { weather } = useWeather(location);
    const { searchLocation, searchCity } = useCitySearch();
    const { city } = useCityName(searchLocation || location);

    // set user location
    useEffect(() => {
        if (userLocation && !search) {
            setLocation(searchLocation);
        }
    }, [userLocation]);

    // set location from searched city
    useEffect(() => {
        if (searchLocation) {
            setLocation(searchLocation);
            setSearch(true);
            setSearchQuery("");
        }
    }, [searchLocation]);

    const handleSearch = () => {
        setSearchLoading(true);
        searchCity(searchQuery); // calls the hook to get the coordinates
        setSearchLoading(false)
    };

    return (
        <View>
      <View style={styles.flexContainer1}>
        <ImageBackground
          source={setImageByTime()}
          style={styles.image}>

          <SafeAreaView style={styles.image}>
            <View style={styles.cityContainer}>
              <View style={styles.cityLeft}>
                <Text variant="displayMedium" style={styles.textWithShadow}>{city}</Text>
                <Text variant="titleLarge" style={styles.textWithShadow}>{getCurrentDate()}</Text>
              </View>
              <View style={styles.cityRigth}>
                <FAB
                  variant='surface'
                  icon='map-marker'
                  size={10}
                  style={styles.fab}
                  onPress={() => {
                    if (search) {
                      setLocation(userLocation);
                    }
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
            style={styles.searchbar}
          />
        </View>

      </View>
      <View style={styles.flexContainer2}>
        {/* <Forecast location={location} /> */}
      </View>
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
    width: '50',
    height: '50',
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
  },
});