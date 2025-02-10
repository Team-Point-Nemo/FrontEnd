import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getWeatherInHelsinki } from '../api';

export default function IndexScreen() {
  const [temperature, setTemperature] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [weather, setWeather] = useState({
    main: {
      temp: 1, feels_like: 2
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
      {/* <Text>Temperature: {temperature} celsius</Text>
      <Text>Feels like: {feelsLike} celsius</Text> */}
      <Text>Temperature: {(weather.main.temp - 273.15).toFixed(1)}</Text>
      <Text>Feels like: {(weather.main.feels_like - 273.15).toFixed(1)}</Text>
      <Text>Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
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
});