import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import WeatherNow from '../components/weather/WeatherNow';

export default function IndexScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
     <WeatherNow />
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