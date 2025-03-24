import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, View, ImageBackground } from 'react-native';
import { Text, Searchbar, IconButton } from 'react-native-paper';
import { getCurrentWeatherInLocation } from '../../api';
import { getCurrentDate, setImageByTime } from '../date/DateService';
import { SearchCity } from '../Location/SearchCity';
import UserLocation from '../Location/UserLocation';
import CityFetch from '../Location/CityFetch';

import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function WeatherNow() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  useEffect(() => {
    if (location) {  // Ensures, that location.coords or location.coord has a value
      getWeather(location)
    }
  }, [location]);

  const handleLocationFetched = (location) => {   // 'location'-object is passed from UserLocation-component
  setLocation(location);
  };

  const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();    // Checks if user has grant permissions for location.
      if (status !== 'granted') {
          Alert.alert('Location permissions denied');
          return;
      }

      try {
          let location = await Location.getCurrentPositionAsync({});    // Get location as object 'coords'.
          setLocation(location);    // Passes object to parent component.
      } catch (err) {
          console.error("Error in fetching location: ", err);
          Alert.alert('Error in fetching location');
      }
  };

  const handleSearch = async () => {
    try {
      const cityLocation = await SearchCity(searchQuery);
      if (cityLocation) {
        setSearchedCity(cityLocation.name);
        console.log('teksti etee', cityLocation.name);
        setLocation(cityLocation);
        getWeather(location);
      } else {
        console.error("City location not found");
      }
    } catch (err) {
      console.error("Error in fetching location in searched city: ", err);
    }
  };

  const getWeather = async () => {
    try {
      const data = await getCurrentWeatherInLocation(location);
      if (data) {
        setWeather(data);
      } else {
        console.error("Weather data not found.");
        setWeather(null);
      }
    } catch (err) {
        console.error("Error in fetching location: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
      icon="camera"
      size={20}
      onPress={fetchLocation}
    />
      <UserLocation onLocationFetched={handleLocationFetched} />
      <ImageBackground 
      source={setImageByTime()}
      style={styles.image} >
        {location && <CityFetch location={location} />}
        <Text variant="titleLarge" style={styles.textWithShadow}>{getCurrentDate()}</Text>
      </ImageBackground>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onIconPress={handleSearch}
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