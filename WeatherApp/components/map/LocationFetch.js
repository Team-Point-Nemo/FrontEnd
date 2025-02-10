import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { View, Text, ActivityIndicator } from 'react-native';

export default function LocationFetch({ onLocationFetched }) {

  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Sijaintioikeudet evätty');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address.length > 0) {
          const newLocationName = address[0].district || address[0].city || 'Location unknown';
          setLocationName(newLocationName);
          console.log("Location name set:", newLocationName);
          onLocationFetched(newLocationName); // Välitetään sijainti IndexScreenille
        }
      } catch (error) {
        setErrorMsg('Sijainnin hakeminen epäonnistui');
      } finally {
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return null;
}