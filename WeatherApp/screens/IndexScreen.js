import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { getWeatherInHelsinki } from '../api';

export default function IndexScreen() {
  const [temperature, setTemperature] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [weather, setWeather] = useState({
    main: {
      temp: 280, feels_like: 282
    },
    wind: {speed: 4},
  })

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    getWeatherInHelsinki()
    .then(data => setWeather(data))
    .catch(err => console.error(err))
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Temperature: {(weather.main.temp - 273.15).toFixed(1)} °C</Text>
      <Text>Feels like: {(weather.main.feels_like - 273.15).toFixed(1)} °C</Text>
      <Text>Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
      <Image 
        style={styles.weatherIcon}
        source={{
          uri: weather.weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` : ''
        }}
      />
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