import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import WeatherNow from '../components/weather/WeatherNow';
import FourDaysForecast from '../components/weather/FourDaysForecast';

export default function IndexScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
     <WeatherNow />
     <FourDaysForecast />
     </ScrollView>
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