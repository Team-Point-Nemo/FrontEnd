import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function WeatherLayout({weather}) {

    if(!weather) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>Weather in {city}</Text> */}
            {/* <UserLocation onLocationFetched={handleLocationFetched} /> */}
            {/* {location && <CityFetch location={location} />} */}
            <Text>Temperature: {(weather.main.temp - 273.15).toFixed(0)} °C </Text>
            <Text>Feels like: {(weather.main.feels_like - 273.15).toFixed(0)} °C</Text>
            <Text>Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
            <Image
                style={styles.weatherIcon}
                source={{
                    uri: weather.weather ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` : ''
                }}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherIcon: {
        width: 70,
        height: 70,
        marginTop: 20,
    },
});