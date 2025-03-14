import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Button, Image, View } from "react-native";
import { getWeatherByCity } from "../../api";

export default function WeatherSearch() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [searchedCity, setSearchedCity] = useState('');
  const [cityNotFound, setCityNotFound] = useState(false);

  const handleSearch = async () => {
    if (city.trim().length === 0) {
      console.log("No city input ", error)
      Alert.alert("No city input ", error)
      return
    }
    setWeather(null);
    setCityNotFound(false);

    try {
      const weatherData = await getWeatherByCity(city)
      setWeather(weatherData)
      setSearchedCity(city)
    } catch (error) {
      setCityNotFound(true)
      console.log("Error in fetching weather data ", error)
      Alert.alert("Error in fetching weather data ", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Find weather in..."
        value={city}
        onChangeText={setCity}
      />
      <Button
        title="Search"
        onPress={handleSearch}
        color='#808080'
      />

      {cityNotFound ? (
        <Text style={styles.cityText}>City not found</Text>
      ) : ''}

      {searchedCity && !cityNotFound ? (
        <Text style={styles.cityText}>Weather in {searchedCity}</Text>
      ) : ''}

      {weather && !cityNotFound && (
        <View style={styles.weatherArea}>
          <Text>Temperature: {(weather.main.temp - 273.15).toFixed(0)} °C </Text>
          <Text>Feels like: {(weather.main.feels_like - 273.15).toFixed(0)} °C</Text>
          <Text>Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: weather.weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` : ''
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 120,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  cityText: {
    marginTop: 60,
    textAlign: 'flex-start',
  },
  weatherArea: {
  },
  weatherIcon: {
    width: 70,
    height: 70,
    marginTop: 20,
  },
});
