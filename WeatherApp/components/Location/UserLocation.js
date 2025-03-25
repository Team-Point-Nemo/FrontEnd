/* This file uses Expo Location and returns location-object */

import * as Location from 'expo-location';
import { Alert } from 'react-native';

export async function UserLocation() {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();    // Checks if user has grant permissions for location.
        if (status !== 'granted') {
            Alert.alert('Location permissions denied');
            return;
        }
        try {
            let location = await Location.getCurrentPositionAsync({});    // Get location as object 'coords'.
            return(location);
        } catch (err) {
            console.error("Error in fetching location: ", err);
            Alert.alert('Error in fetching location');
        }
    } catch (err) {
        console.error("Error in fetching location: ", err);
        Alert.alert('Error in fetching location');
    };
}