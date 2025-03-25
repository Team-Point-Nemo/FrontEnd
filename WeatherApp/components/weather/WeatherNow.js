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
        console.error("Weather data not found.");
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
        console.error("Error in fetching user location.");
      }
    } catch (err) {
      console.error("Error in fetching user location: ", err);
    }
  };

  const handleSearchedLocation = async () => {
    try {
      const cityLocation = await SearchCity(searchQuery);
      if (cityLocation) {
        setLocation({
          latitude: cityLocation.coord.lat,
          longitude: cityLocation.coord.lon,
        });
        setSearch(true);
      } else {
        console.error("City location not found.");
      }
    } catch (err) {
      console.error("Error in fetching location in searched city: ", err);
    }
  }

  return (
    <SafeAreaView>
    <View style={styles.flexContainer1}>
      <FAB
        icon='map-marker'
        size={20}
        style={styles.fab}
        onPress={() => {
          if (search) {
            getUserLocation();
          }
        }}
      />
      <ImageBackground 
      source={setImageByTime()}
      style={styles.image}>
        <Text variant="displayMedium" style={styles.textWithShadow}>{city}</Text>
        <Text variant="titleLarge" style={styles.textWithShadow}>{getCurrentDate()}</Text>
      </ImageBackground>
      <Searchbar
        placeholder="Search city..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        onIconPress={handleSearchedLocation}
      />
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
      </View>
      <View style={styles.flexContainer2}>
        <Forecast location={location} />
      </View>
    <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
textWithShadow: {
  shadowOpacity: 0.4,
  shadowOffset: {
    width: 1,
    height: 1
  },
},
flexContainer1: {
  flex: 1,
  width: '100%',
},
flexContainer2: {
  flex: 1,
  width: '100%',
  alignItems: 'center',
},
fab: {
  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 0,
},
container: {
  flex: 2,
  width: '100%',
  height: '100%',
},
image: {
  flex: 1,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: 60,
  paddingBottom: 30,
},
weatherContainer: {
  padding: 50,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
},
columnLeft: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
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
});