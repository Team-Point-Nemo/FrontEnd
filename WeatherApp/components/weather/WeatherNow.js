import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Image, StatusBar } from "react-native";
import { getWeatherInHelsinki } from "../../api";
import UserLocation from "../Location/UserLocation";
import CityFetch from "../Location/CityFetch";

export default function WeatherNow() {
  //const [city, setCity] = useState(null);
  const [location, setLocation] = useState(null);

  const handleLocationFetched = (location) => {
    // 'location'-object is passed from UserLocation-component
    setLocation(location);
  };

  const [weather, setWeather] = useState({
    main: {
      temp: 280,
      feels_like: 282,
    },
    wind: { speed: 4 },
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    getWeatherInHelsinki()
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView>
      <UserLocation onLocationFetched={handleLocationFetched} />
      {location && <CityFetch location={location} />}
      <Text>Temperature: {(weather.main.temp - 273.15).toFixed(0)} °C </Text>
      <Text>Feels like: {(weather.main.feels_like - 273.15).toFixed(0)} °C</Text>
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