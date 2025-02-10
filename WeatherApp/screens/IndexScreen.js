import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeatherData } from '../weatherapi';

export default function IndexScreen() {
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    getWeatherData()
      .then(data => console.log("Haettu säädata:", JSON.stringify(data, null, 2)))
      .catch(error => console.error("Virhe haettaessa säätietoa:", error));
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