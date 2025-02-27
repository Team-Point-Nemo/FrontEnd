import * as Location from 'expo-location';
import { useEffect } from 'react';

export default function UserLocation({ onLocationFetched }) {
    useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync(); // Checks if user has grant permissions for location
        if (status !== 'granted') {
            Alert.alert('Location permissions denied')
            return;
        }

        try {
            let location = await Location.getCurrentPositionAsync({}); // Get location as object 'coords'
            console.log("Fetched location:", location);
            onLocationFetched(location); // Passes object to parent component
        } catch (err) {
            console.error("Error in fetching location: ", err);
            Alert.alert('Error in fetching location');
        }
    };
}