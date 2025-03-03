import React, { useState } from "react";
import { SafeAreaView, TextInput, Button } from "react-native";
import { getWeatherData } from "../../weatherapi";
import WeatherLayout from "./WeatherLayout";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (city) => {
    try {
      const data = await getWeatherData(city);
      setWeather(data)
    } catch (error) {
      console.error("Error fetching city " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim().length > 0) {
      fetchWeatherData(city);
    } else {
      console.log("Error in city input" + error)
      Alert.alert("Input error")
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Type city name"
        value={city}
        onChangeText={setCity}
      />
      <Button 
        style={styles.button} 
        title="Search" 
        onPress={handleSearch} 
        />
      {weather && <WeatherLayout weather={weather} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {

  },
  button: {

  }
})
