// import React, { useState, useEffect } from 'react';
// import * as Location from 'expo-location';
// import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
// import { Text } from 'react-native-paper';

// export default function CityFetch({ location }) {

//   const [city, setCity] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (location) {  // Ensures, that location has a value
//       getCity(location);
//     }
//   }, [location]);

//   const getCity = async (location) => {
//     try {
//       const address = await Location.reverseGeocodeAsync({
//         latitude: location.latitude,
//         longitude: location.longitude,
//       });

//       if (address.length > 0) {
//         const newCity = address[0].city || 'Location unknown';
//         setCity(newCity);
//       }
//     } catch (err) {
//         console.error("Error in fetching city: ", err);
//         Alert.alert('Error in fetching city');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <Text variant="displayMedium" style={styles.textWithShadow} >{city || 'Unknown'}</Text>
//   );
// }

// const styles = StyleSheet.create({
//     textWithShadow: {
//       shadowOpacity: 0.4,
//       shadowOffset: {
//         width: 1,
//         height: 1
//       },
//     },
// });

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
      console.error("Error in CityFetch.js. Error in fetching city: ", err);
      throw new Error('Error fetching city.');
  }
};