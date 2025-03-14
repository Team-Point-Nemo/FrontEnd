import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons'
import UserLocation from '../location/UserLocation';

export default function MapDefaultView() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 65,   // Default (Finland)
    longitude: 26,
    latitudeDelta: 10.5,  // Wide zoom (whole Finland)
    longitudeDelta: 10.5,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const handleLocationFetched = async (location) => {   // 'location'-object is passed from UserLocation-component
    setUserLocation(location);
  };

  useEffect(() => {
    if (userLocation) {
      resetToUserLocation();
    }
  }, [userLocation]);

  const resetToUserLocation = () => {
    if (userLocation) {
      setLoadingUserLocation(true);
      try {
        // Zoom to user's location
        setMapRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.05,  // Zoom set to city level
          longitudeDelta: 0.05,
        });
      } catch (err) {
          console.error("Error: ", err);
      } finally {
          setLoadingUserLocation(false);
      }
    }
  };

  const resetMap = () => {
    setLoadingReset(true)
    try {
      setMapRegion({
        latitude: 65,   // Default (Finland)
        longitude: 26,
        latitudeDelta: 10.5,  // Wide zoom (whole Finland)
        longitudeDelta: 10.5,
      });
    } catch (err) {
        console.error("Error: ", err);
    } finally {
        setLoadingReset(false);
    }
  };

  return (
    <View style={styles.container}>
      <UserLocation onLocationFetched={handleLocationFetched} />
      <MapView
        region={mapRegion}
        onRegionChangeComplete={(region) => setMapRegion(region)}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
      >

      {/* Add marker to user's location */}
      {userLocation && userLocation.coords && (
        <Marker 
          coordinate={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude
          }} 
          title="Oma sijainti" 
        />
      )}
      </MapView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={resetToUserLocation}>
        {loadingUserLocation ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <MaterialIcons name="my-location" size={20} color="white" />
            <Text style={styles.buttonText}>Location</Text>
          </>
        )}
        </Pressable>
        <Pressable style={[styles.button, styles.resetButton]} onPress={resetMap}>
        {loadingReset ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
          <MaterialIcons name="zoom-out-map" size={20} color="white" />
          <Text style={styles.buttonText}>Reset</Text>
          </>
        )}
        </Pressable>
      </View>
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
  }
});
