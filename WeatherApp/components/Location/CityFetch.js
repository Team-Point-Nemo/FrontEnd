import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { ActivityIndicator, Alert } from 'react-native';
import { Text } from 'react-native-paper';

export default function CityFetch({ location }) {

  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.coords) {  // Ensures, that location.coords has a value
      getCity(location);
    }
  }, [location]);

  const getCity = async (location) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address.length > 0) {
        const newCity = address[0].city || 'Location unknown';
        setCity(newCity);
      }
    } catch (err) {
        console.error("Error in fetching city: ", err);
        Alert.alert('Error in fetching city');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Text variant="displaySmall">{city || 'Unknown'}</Text>
  );

}