/* This file checks user input and returns coordinates for correct input. */

import { Alert } from "react-native";
import { getCityCoords } from "../../api";

export function SearchCity(city) {
    if (!city.trim()) {     // If searching without any text
      console.log("No city input ", error)
      Alert.alert("No city input ", error)
      return
    }

    try { 
      return getCityCoords(city.trim());
    } catch (err) {
      console.error("Error in fetching coordinates for searched city: ", err);
      return null;
    }
};