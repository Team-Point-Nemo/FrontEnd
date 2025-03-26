import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, View, ImageBackground } from 'react-native';
import { Text, Searchbar, FAB  } from 'react-native-paper';
import { getCurrentWeatherInLocation } from '../../api';
import { getCurrentDate, setImageByTime } from '../date/DateService';
import { SearchCity } from '../Location/SearchCity';
import { getCity } from '../Location/CityFetch';
import { UserLocation } from '../Location/UserLocation';
import Forecast from './forecast/Forecast';

export default function WeatherNow() {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!location.latitude && !location.latitude) {
      getUserLocation();  // Get the user's location on first render
    } else if (location.latitude && location.longitude) {  // Ensures, that location has value
      getWeather(location);
      getCity(location)
      .then(cityName => {
        setCity(cityName);
      });
    }
  }, [location]);

  const getWeather = async (location) => {
    try {
      const data = await getCurrentWeatherInLocation(location);
      if (data) {
        setWeather(data);
      } else {
        console.error("Weather data not found");
        setWeather(null);
      }
    } catch (err) {
        console.error("Error in fetching weather: ", err);
    }
  };

  const getUserLocation = async () => {
    try {
      const userLocation = await UserLocation();
      if (userLocation) {
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
        setSearch(false);
      } else {
        console.error("Error in fetching user location");
      }
    } catch (err) {
      console.error("Error in fetching user location: ", err);
    }
  };

  const handleSearchedLocation = async () => {
    setSearchLoading(true);
    try {
      const cityLocation = await SearchCity(searchQuery);
      if (cityLocation) {
        setLocation({
          latitude: cityLocation.coord.lat,
          longitude: cityLocation.coord.lon,
        });
        setSearch(true);
        setSearchQuery('');
      } else {
        console.error("City location not found.");
      }
    } catch (err) {
      console.error("Error in fetching location in searched city: ", err);
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <View>
      <View style={styles.flexContainer1}>
        <ImageBackground 
        source={setImageByTime()}
        style={styles.image}>
          <SafeAreaView style={styles.image}>
          <Text variant="displayMedium" style={styles.textWithShadow}>{city}</Text>
          <Text variant="titleLarge" style={styles.textWithShadow}>{getCurrentDate()}</Text>
          {weather?.main && (   // Checks, that weather (and main-array in it's data) has value, before rendering.
          <View style={styles.weatherContainer}>
            <View style={styles.columnLeft}>
            <Text variant="displayLarge" style={styles.textWithShadow}>{weather.main.temp.toFixed(0)}°</Text>
            {weather?.weather && weather.weather[0] ? (
                <Image 
                  style={styles.weatherIcon}
                  source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
                />
              ) : null}
            </View>
            <View style={styles.columnRight}>
              <Text variant="titleMedium" style={styles.textWithShadow}>Feels like: {weather.main.feels_like.toFixed(0)}°</Text>
              <Text variant="titleMedium" style={styles.textWithShadow}>Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
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
              onIconPress={handleSearchedLocation}
              style={styles.searchbar}
            />
            <FAB
              variant='surface'
              icon='map-marker'
              size={15}
              style={styles.fab}
              onPress={() => {
                if (search) {
                  getUserLocation();
                }
              }}
            />
        </View>
      </View>
      <View style={styles.flexContainer2}>
        <Forecast location={location} />
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
  weatherContainer: {
    padding: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbar: {
    width: '70%',
  },
  textWithShadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 1
    },
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
    marginTop: 25,
    marginBottom: 5,
    marginHorizontal: 30,
  },
});