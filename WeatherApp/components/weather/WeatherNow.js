import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { getCurrentWeatherInLocation } from '../../api';
import UserLocation from '../Location/UserLocation';
import CityFetch from '../Location/CityFetch';

export default function WeatherNow(){
const [location, setLocation] = useState({});
const [weather, setWeather] = useState([]);

useEffect(() => {
  if (location.coords) {  // Ensures, that location.coords has a value
    getWeather(location)
  }
}, [location]);

  const handleLocationFetched = (location) => {   // 'location'-object is passed from UserLocation-component
  setLocation(location);
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
  <UserLocation onLocationFetched={handleLocationFetched} />
    {location && <CityFetch location={location} />}
    {weather?.main && (   // Checks, that weather (and main-array in it's data) has value, before rendering.
    <>
      <Text>Temperature: {(weather.main.temp - 273.15).toFixed(0)} °C</Text>
      <Text>Feels like: {(weather.main.feels_like - 273.15).toFixed(0)} °C</Text>
      <Text>Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
    </>
  )}
  {weather?.weather && weather.weather[0] ? (
    <Image 
      style={styles.weatherIcon}
      source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
    />
  ) : (
    <Text>No weather icon available</Text>
  )}
    <StatusBar style="auto" />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
weatherIcon: {
  width: 70,
  height: 70,
  marginTop: 20,
},
});
