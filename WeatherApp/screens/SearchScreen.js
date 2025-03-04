import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import SearchCity from "../components/Location/SearchCity";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchCity />
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
