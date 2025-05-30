// Custom hook for city search

import { useState } from "react";
import { getCityCoords } from "../api";
import { Alert } from "react-native";

export default function useCitySearch() {
  const [searchLocation, setSearchLocation] = useState(null);

  const searchCity = async (city) => {
    if (!city.trim()) {
      Alert.alert("Set city to search");
      return;
    }
    const trimmedCity = city.trim();

    try {
      const cityCoords = await getCityCoords(trimmedCity);
      if (cityCoords) {
        setSearchLocation({
          latitude: cityCoords.coord.lat,
          longitude: cityCoords.coord.lon,
        });
        return true;
      } else {
        Alert.alert("City location not found");
        console.error("City location not found.");
        setSearchLocation(null);
        return false;
      }
    } catch (err) {
      console.error("Error in fetching searched city location: ", err);
      setSearchLocation(null);
      return false;
    }
  };

  return { searchLocation, searchCity };
}
