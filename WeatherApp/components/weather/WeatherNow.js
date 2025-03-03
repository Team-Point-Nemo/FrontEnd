import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { getWeatherInHelsinki } from "../../api";
import UserLocation from "../Location/UserLocation";
import CityFetch from "../Location/CityFetch";
import WeatherLayout from "./WeatherLayout";

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
      {weather && <WeatherLayout weather={weather} />}
    </SafeAreaView>
  );
}
