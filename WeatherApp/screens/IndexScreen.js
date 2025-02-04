import { StatusBar } from 'expo-status-bar';
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
    <View style={styles.container}>
      <Text>Index</Text>
      <StatusBar style="auto" />
    </View>
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