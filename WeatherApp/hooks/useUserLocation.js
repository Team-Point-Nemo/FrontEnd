// Custom hook for fetching coordinates from users location

import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function useUserLocation() {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();    // Checks if user has grant permissions for location.
                if (status !== 'granted') {
                    Alert.alert('Location permissions denied');
                    return;
                }
                try {
                    let location = await Location.getCurrentPositionAsync({});    // Get location as object 'coords'.
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    })
                } catch (err) {
                    console.error("Error in fetching location 1: ", err);
                    Alert.alert('Error in fetching location');
                }
            } catch (err) {
                console.error("Error in fetching location 2: ", err);
                Alert.alert('Error in fetching location');
            };
        };
        getUserLocation();
    }, []);

    return { location };
}
