import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import UserLocation from '../Location/UserLocation';


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
console.log("Weather API Key:", WEATHER_API_KEY);

export default function MapDefaultView() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 65,   // Default (Finland)
    longitude: 26,
    latitudeDelta: 10.5,
    longitudeDelta: 10.5,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [showRainMap, setShowRainMap] = useState(false);

  const handleLocationFetched = async (location) => {
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
        setMapRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.05,
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
    setLoadingReset(true);
    try {
      setMapRegion({
        latitude: 65,
        longitude: 26,
        latitudeDelta: 10.5,
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
        {/* Käyttäjän sijaintimarkkeri */}
        {userLocation && userLocation.coords && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude
            }}
            title="Oma sijainti"
          />
        )}

        {/* Sadekartta (jos näkyvyys on päällä) */}
        {showRainMap && (
          <UrlTile
            urlTemplate={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=b74779bdf87fc91c8f995e35e0437ec8`}
            zIndex={5}
            onError={(e) => {
              console.error("Error loading rain map tile: ", e);
            }}
          />
        )}
      </MapView>

      {/* Nappulat */}
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

        {/* Sadekartan nappula */}
        <Pressable 
          style={[styles.button, styles.rainButton]} 
          onPress={() => {
            console.log("Show Rain Toggled: ", !showRainMap); // Tarkista, että tila vaihtuu
            setShowRainMap(!showRainMap);
          }}
        >
          <MaterialIcons name="opacity" size={20} color="white" />
          <Text style={styles.buttonText}>{showRainMap ? "Hide Rain" : "Show Rain"}</Text>
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
  rainButton: {
    backgroundColor: '#00aaff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  }
});
