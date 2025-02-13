import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import MapDefaultView from '../components/map/MapDefaultView';

export default function Map() {

  return (
    <SafeAreaView style={styles.container}>
      <MapDefaultView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
