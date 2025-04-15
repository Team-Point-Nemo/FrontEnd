import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import useUserLocation from "../../hooks/useUserLocation";
import { getLayerTiles } from '../../api';
import { FAB, useTheme } from 'react-native-paper';

export default function MapDefaultView() {
  const Theme = useTheme();
  const active = Theme.colors.primary;
  const inactive = Theme.colors.tertiary;

  const [mapRegion, setMapRegion] = useState({
    latitude: 65,   // Default (Finland)
    longitude: 26,
    latitudeDelta: 10.5,
    longitudeDelta: 10.5,
  });

  const { location: userLocation } = useUserLocation();

  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [showRainMap, setShowRainMap] = useState(false);
  const [showWindMap, setShowWindMap] = useState(false);
  const [showTempMap, setShowTempMap] = useState(false);
  const [showCloudMap, setShowCloudMap] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  const locationFetchTimeout = useRef(null);

  const resetToUserLocation = () => {
    if (userLocation) {
      setLoadingUserLocation(true);
      try {
        setMapRegion({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
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
    }, 2000);
  };
  return (
    <View style={styles.container}>
      {/* <UserLocation onLocationFetched={handleLocationFetched} /> */}
      <MapView
        region={mapRegion}
        onRegionChangeComplete={handleRegionChange}
        //handleRegionChange kohdan tilalle ylemmällä rivillä (rivi 107) voi vaihtaa (region) => setMapRegion(region), joka on uuden koodin versio. Nykyinen malli estää kartan/GPS:n nykimisen
        style={styles.map}
        showsUserLocation={true}
      >
        {/* Sadekartta (jos näkyvyys on päällä) */}
        {showRainMap && (
          <UrlTile
            urlTemplate={getLayerTiles('precipitation_new')}
            zIndex={5}
            style={{ opacity: 1 }}
          />
        )}
        {showWindMap && (
          <UrlTile
            urlTemplate={getLayerTiles('wind_new')}
            zIndex={5}
            style={{ opacity: 1 }}
          />
        )}
        {showTempMap && (
          <UrlTile
            urlTemplate={getLayerTiles('temp_new')}
            zIndex={5}
            style={{ opacity: 1 }}
          />
        )}
        {showCloudMap && (
          <UrlTile
            urlTemplate={getLayerTiles('cloud_new')}
            zIndex={5}
            style={{ opacity: 1 }}
          />
        )}
      </MapView>

      <View style={styles.overlay} />

      <FAB.Group
        open={fabOpen}
        icon={fabOpen ? 'close' : 'menu'}
        backdropColor='rgba(255, 255, 255, 0.89)'
        actions={[
          { icon: 'map-marker', color: 'black', label: 'Location', labelTextColor: 'black', onPress: resetToUserLocation },
          { icon: 'restore', color: 'black', label: 'Finland', labelTextColor: 'black', onPress: resetMap },
          { icon: 'weather-rainy', color: showRainMap ? active : inactive, label: showRainMap ? 'Hide Rain' : 'Show Rain', labelTextColor: showRainMap ? active : inactive, onPress: () => setShowRainMap(!showRainMap) },
          { icon: 'weather-windy', color: showWindMap ? active : inactive, label: showWindMap ? 'Hide Wind' : 'Show Wind', labelTextColor: showWindMap ? active : inactive, onPress: () => setShowWindMap(!showWindMap) },
          { icon: 'thermometer', color: showTempMap ? active : inactive, label: showTempMap ? 'Hide Temp' : 'Show Temp', labelTextColor: showTempMap ? active : inactive, onPress: () => setShowTempMap(!showTempMap) },
          { icon: 'weather-cloudy', color: showCloudMap ? active : inactive, label: showCloudMap ? 'Hide Clouds' : 'Show Clouds', labelTextColor: showCloudMap ? active : inactive, onPress: () => setShowCloudMap(!showCloudMap) },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
      />
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
  // buttonContainer: {
  //   position: 'absolute',
  //   bottom: 20,
  //   flexDirection: 'row',
  //   gap: 10,
  //   alignSelf: 'center',
  // },
  // button: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#007bff',
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderRadius: 10,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.3,
  //   shadowOffset: { width: 0, height: 2 },
  //   elevation: 5,
  // },
});