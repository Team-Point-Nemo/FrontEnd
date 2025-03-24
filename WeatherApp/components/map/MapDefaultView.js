import React, { useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import UserLocation from '../Location/UserLocation';
import { FAB, Portal, Provider as PaperProvider } from 'react-native-paper';

const EXPO_PUBLIC_WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export default function MapDefaultView() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 65,
    longitude: 26,
    latitudeDelta: 10.5,
    longitudeDelta: 10.5,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [showRainMap, setShowRainMap] = useState(false);
  const [showWindMap, setShowWindMap] = useState(false);
  const [fabOpen, setFabOpen] = useState(false); // 🔹 Hampurilaismenun tila

  const mapRef = useRef(null);

  const handleLocationFetched = (location) => {
    setUserLocation(location);
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 1.5,
      longitudeDelta: 1.5,
    });
  };

  const resetToUserLocation = () => {
    if (userLocation) {
      setLoadingUserLocation(true);
      try {
        const newRegion = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        };

        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        } else {
          setMapRegion(newRegion);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoadingUserLocation(false);
      }
    }
  };

  const resetMap = () => {
    setLoadingReset(true);
    try {
      const defaultRegion = {
        latitude: 65,
        longitude: 26,
        latitudeDelta: 10.5,
        longitudeDelta: 10.5,
      };

      if (mapRef.current) {
        mapRef.current.animateToRegion(defaultRegion, 1000);
      } else {
        setMapRegion(defaultRegion);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <UserLocation onLocationFetched={handleLocationFetched} />
        <MapView
          ref={mapRef}
          region={mapRegion}
          onRegionChangeComplete={(region) => setMapRegion(region)}
          style={styles.map}
          showsUserLocation={true}
        >
          {userLocation && userLocation.coords && (
            <Marker
              coordinate={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
              }}
              title="Oma sijainti"
            />
          )}

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

        {/* Hampurilaismenu (FAB Group) */}
        <Portal>
          <FAB.Group
            open={fabOpen}
            icon={fabOpen ? 'close' : 'menu'} // Avattuna X, muuten hampurilainen
            color="white"
            fabStyle={styles.fabMain}
            actions={[
              {
                icon: 'crosshairs-gps',
                label: 'Sijainti',
                onPress: resetToUserLocation,
                small: false,
              },
              {
                icon: 'refresh',
                label: 'Resetoi kartta',
                onPress: resetMap,
                small: false,
              },
              {
                icon: showRainMap ? 'weather-rainy' : 'weather-sunny',
                label: showRainMap ? 'Piilota sade' : 'Näytä sade',
                onPress: () => setShowRainMap(!showRainMap),
                small: false,
              },
              {
                icon: showWindMap ? 'weather-windy' : 'weather-windy-variant',
                label: showWindMap ? 'Piilota tuuli' : 'Näytä tuuli',
                onPress: () => setShowWindMap(!showWindMap),
                small: false,
              },
            ]}
            onStateChange={({ open }) => setFabOpen(open)}
          />
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  fabMain: {
    backgroundColor: '#007bff', // Pää-FAB:n väri
  },
});

