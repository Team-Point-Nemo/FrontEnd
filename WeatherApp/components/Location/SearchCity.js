import { Alert } from "react-native";
import { getCityCoords } from "../../api";

export async function SearchCity(city) {
    if (!city.trim()) {     // if searching without any text
      console.log("No city input ", error)
      Alert.alert("No city input ", error)
      return
    }

    try { 
      const coords = await getCityCoords(city.trim());
      return coords;
    } catch (err) {
      console.error("Error in fetching coords for searched city: ", err);
      return null;
    }
};