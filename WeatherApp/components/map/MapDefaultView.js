import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import UserLocation from '../Location/UserLocation';
import { getRainTiles } from '../../api';

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

  const handleLocationFetched = location => {
    setUserLocation(location);
  };

  const resetToUserLocation = () => {
    if (userLocation) {
      setLoadingUserLocation(true);
      try {
        setMapRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
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
            urlTemplate={getRainTiles}
            zIndex={5}
            style={{ opacity: 1 }}
            onError={(e) => {
              console.error("Error loading rain map tile: ", e);
            }}
          />
        )}
      </MapView>

      <View style={styles.overlay} />

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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(118, 119, 170, 0.09)',
    zIndex: 0,  // 0 = Overlay is over map, but under buttons
    pointerEvents: 'none', // Allows user interaction with map
  },
  map: {
    flex: 1,
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
