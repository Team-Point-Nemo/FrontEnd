import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import WeatherByCity from "../components/weather/WeatherByCity";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <WeatherByCity />
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
});
