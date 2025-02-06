import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeatherInHelsinki } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const [temperature, setTemperature] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);

  useEffect(() => {
    handleFetch();
  });

  const handleFetch = () => {
    getWeatherInHelsinki()
    .then(data => {
      setTemperature(Number(data.main.temp) - 273.15)
      setFeelsLike(Number(data.main.feels_like) - 273.15)
    })
    .catch(err => console.error(err))
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Temperature: {temperature} celsius</Text>
      <Text>Feels like: {feelsLike} celsius</Text>
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