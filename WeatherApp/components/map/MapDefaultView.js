import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import UserLocation from '../Location/UserLocation';
import { FAB, Provider as PaperProvider } from 'react-native-paper';

const EXPO_PUBLIC_WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

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
  const [showWindMap, setShowWindMap] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  
  const locationFetchTimeout = useRef(null);

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

  const handleRegionChange = (region) => {
    if (locationFetchTimeout.current) {
      clearTimeout(locationFetchTimeout.current);
    }

    locationFetchTimeout.current = setTimeout(() => {
      setMapRegion((prevRegion) => {
        const isSameRegion =
          Math.abs(prevRegion.latitude - region.latitude) < 0.0001 &&
          Math.abs(prevRegion.longitude - region.longitude) < 0.0001;

        return isSameRegion ? prevRegion : region;
      });
    }, 2000); // Päivitetään vain kerran sekunnissa
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <UserLocation onLocationFetched={handleLocationFetched} />
        <MapView
          region={mapRegion}
          onRegionChangeComplete={handleRegionChange}
          style={styles.map}
          showsUserLocation={true}
        >
          {showRainMap && (
            <UrlTile
              urlTemplate={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${EXPO_PUBLIC_WEATHER_API_KEY}`}
              zIndex={5}
              style={{ opacity: 1 }}
            />
          )}
          {showWindMap && (
            <UrlTile
              urlTemplate={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${EXPO_PUBLIC_WEATHER_API_KEY}`}
              zIndex={5}
              style={{ opacity: 1 }}
            />
          )}
        </MapView>

        <FAB.Group
          open={fabOpen}
          icon={fabOpen ? 'close' : 'menu'}
          backdropColor='transparent'
          actions={[
            { icon: 'map-marker', label: 'Location', onPress: resetToUserLocation },
            { icon: 'restore', label: 'Finland  ', onPress: resetMap },
            { icon: 'weather-rainy', label: showRainMap ? 'Hide Rain' : 'Show Rain', onPress: () => setShowRainMap(!showRainMap) },
            { icon: 'weather-windy', label: showWindMap ? 'Hide Wind' : 'Show Wind', onPress: () => setShowWindMap(!showWindMap) },
          ]}
          onStateChange={({ open }) => setFabOpen(open)}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
