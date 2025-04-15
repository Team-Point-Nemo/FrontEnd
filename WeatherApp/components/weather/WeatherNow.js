import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, View, ImageBackground, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Searchbar, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentWeatherInLocation } from '../../api';
import { getCurrentDate, setImageByTime } from '../date/DateService';
import { SearchCity } from '../Location/SearchCity';
import { getCity } from '../Location/CityFetch';
import { UserLocation } from '../Location/UserLocation';
import Forecast from './forecast/Forecast';

export default function WeatherNow() {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [recentCities, setRecentCities] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Tarkista onko hakupalkki fokusoitu

  // Haetaan käyttäjän nykyinen sijainti ja sää tiedot
  useEffect(() => {
    const loadRecentCities = async () => {
      try {
        const savedCities = await AsyncStorage.getItem('recentCities');
        if (savedCities) {
          setRecentCities(JSON.parse(savedCities));
        }
      } catch (err) {
        console.error("Error loading recent cities from AsyncStorage:", err);
      }
    };

    loadRecentCities();

    if (!location.latitude && !location.longitude) {
      getUserLocation();
    } else {
      getWeather(location);
      getCity(location).then(cityName => setCity(cityName));
    }
  }, [location]);

  // Haetaan säätiedot
  const getWeather = async (location) => {
    try {
      const data = await getCurrentWeatherInLocation(location);
      setWeather(data || null);
    } catch (err) {
      console.error("Error in fetching weather: ", err);
    }
  };

  // Haetaan käyttäjän nykyinen sijainti
  const getUserLocation = async () => {
    try {
      const userLocation = await UserLocation();
      if (userLocation) {
        setLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
        setSearch(false);
      }
    } catch (err) {
      console.error("Error in fetching user location: ", err);
    }
  };

  // Haetaan kaupungin sijainti hakusanan perusteella
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

        const updatedCities = [searchQuery, ...recentCities.filter(c => c !== searchQuery)].slice(0, 5);
        setRecentCities(updatedCities);
        await AsyncStorage.setItem('recentCities', JSON.stringify(updatedCities));

        setSearchQuery('');
      }
    } catch (err) {
      console.error("Error in fetching location in searched city: ", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Klikattava aiempi haku
  const handleRecentCitySelect = async (city) => {
    try {
      const cityLocation = await SearchCity(city);
      if (cityLocation) {
        setLocation({
          latitude: cityLocation.coord.lat,
          longitude: cityLocation.coord.lon,
        });
        setSearch(true);
        setSearchQuery('');

        const updatedCities = [city, ...recentCities.filter(c => c !== city)].slice(0, 5);
        setRecentCities(updatedCities);
        await AsyncStorage.setItem('recentCities', JSON.stringify(updatedCities));
      }
    } catch (err) {
      console.error("Error in selecting recent city: ", err);
    }
  };

  // Piilotetaan lista, jos klikkaa pois inputista
  const dismissCityList = () => {
    setIsSearchFocused(false);
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dismissCityList}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.flexContainer1}>
            <ImageBackground source={setImageByTime()} style={styles.image}>
              <SafeAreaView style={styles.image}>
                <View style={styles.cityContainer}>
                  <View style={styles.cityLeft}>
                    <Text variant="displayMedium" style={styles.textWithShadow}>{city}</Text>
                    <Text variant="titleLarge" style={styles.textWithShadow}>{getCurrentDate()}</Text>
                  </View>
                  <View style={styles.cityRigth}>
                    <FAB
                      variant="surface"
                      icon="map-marker"
                      size={10}
                      style={styles.fab}
                      onPress={() => { if (search) getUserLocation(); }}
                    />
                  </View>
                </View>

                {weather?.main && (
                  <View style={styles.weatherContainer}>
                    <View style={styles.columnLeft}>
                      <Text variant="displayLarge" style={styles.textWithShadow}>{Math.round(weather.main.temp)}°</Text>
                      {weather?.weather?.icon && (
                        <Image
                          style={styles.weatherIcon}
                          source={{ uri: `http://openweathermap.org/img/wn/${weather.weather.icon}.png` }}
                        />
                      )}
                    </View>
                    <View style={styles.columnRight}>
                      <Text variant="titleMedium" style={styles.textWithShadow}>Feels like: {Math.round(weather.main.feels_like)}°</Text>
                      <Text variant="titleMedium" style={styles.textWithShadow}>Wind speed: {Math.round(weather.wind.speed)} m/s</Text>
                    </View>
                  </View>
                )}
              </SafeAreaView>
            </ImageBackground>

            {/* Hakukenttä */}
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
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </View>

            {/* Aiemmin haetut kaupungit */}
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

// Tyylit
const styles = StyleSheet.create({
  flexContainer1: {
    width: '100%',
  },
  flexContainer2: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
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
