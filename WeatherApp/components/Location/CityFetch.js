/* This file uses Expo Location and returns city according to location coordinates. */

import * as Location from 'expo-location';

export async function getCity(location) {
  try {
    const address = await Location.reverseGeocodeAsync({
      latitude: location.latitude,
      longitude: location.longitude,
    });

    if (address.length > 0) {
      return (address[0].city || 'Location unknown');
    }
  } catch (err) {
      console.error("Error in fetching city: ", err);
      throw new Error('Error fetching city.');
  }
};