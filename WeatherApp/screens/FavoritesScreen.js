import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'

export default function FavoritesScreen() {

  const handleCityPress = (city) => {
    console.log(`City pressed: ${city}`)
  };

  return (
   <View style={styles.container}>
    <Text variant="headlineMedium" style={styles.title}>Favorites</Text>
    <Button
      mode="contained"
      onPress={() => handleCityPress('Helsinki')}
      style={styles.button}
      contentStyle={styles.buttonContent}
      labelStyle={ styles.buttonLabel}
      >
      Helsinki
    </Button>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    marginBottom: 20,
    color: '#333',
  },
  button: {
    marginVertical: 10,
    width: '50%',
    height:'10%'
  },
  buttonContent: {
    height: '100%',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    color: '#fff',
  },
});