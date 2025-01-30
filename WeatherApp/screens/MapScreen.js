import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
      <Button
        title='Index'
        onPress={() => navigation.navigate('Index')} // Navigate to the Index screen
      />
      <StatusBar style="auto" />
    </View>
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