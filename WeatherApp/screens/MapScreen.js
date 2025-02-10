import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 65, // Oletussijainti (Suomi)
    longitude: 26,
    latitudeDelta: 10.5, // Laaja zoom (koko Suomi)
    longitudeDelta: 10.5,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserLocation(); // Haetaan sijainti automaattisesti sovelluksen käynnistyessä
  }, []);

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
      setUserLocation(location.coords);

      // Zoomataan käyttäjän sijaintiin
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05, // Kaupunkitaso
        longitudeDelta: 0.05,
      });

    } catch (error) {
      setErrorMsg('Sijainnin hakeminen epäonnistui');
    } finally {
      setLoading(false);
    }
  };

  const resetMap = () => {
    setMapRegion({
      latitude: 65,
      longitude: 26,
      latitudeDelta: 10.5,
      longitudeDelta: 10.5,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="Oma sijainti" />
        )}
      </MapView>

      {/* Painikkeet */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={getUserLocation}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <MaterialIcons name="my-location" size={20} color="white" />
              <Text style={styles.buttonText}>Sijainti</Text>
            </>
          )}
        </Pressable>

        <Pressable style={[styles.button, styles.resetButton]} onPress={resetMap}>
          <MaterialIcons name="zoom-out-map" size={20} color="white" />
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  resetButton: {
    backgroundColor: '#ff4757',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorText: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: 'red',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
});
