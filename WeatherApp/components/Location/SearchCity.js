import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Button, Image } from "react-native";
import { getWeatherByCity } from "../../api";

export default function WeatherSearch() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  
  const handleSearch = async () => {
    if (!city.trim().length > 0) {
      console.log("Error in city input " + error)
      Alert.alert("Error in city input " + error)
      return
    }
    try {
      const weatherData = await getWeatherByCity(city)
      setWeather(weatherData)
    } catch (error) {
      console.log("Error in fetching weather data " + error)
      Alert.alert("Error in fetching weather data " + error)
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Type city name to search weather"
        value={city}
        onChangeText={setCity}
      />
      <Button
        title="Search"
        onPress={handleSearch}
        color='#808080'
      />
      { weather && (
        <>
        <Text>Temperature: {(weather.main.temp - 273.15).toFixed(0)} °C </Text>
        <Text>Feels like: {(weather.main.feels_like - 273.15).toFixed(0)} °C</Text>
        <Text>Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: weather.weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` : ''
          }} 
        />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 10,
  },
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

// needs styling after button before weather
