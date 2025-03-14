import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import CitySearch from "../components/location/CitySearch";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CitySearch />
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
