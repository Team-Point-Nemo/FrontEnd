import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import WeatherNow from '../components/weather/WeatherNow';
import { setThemeByTime } from '../components/date/DateService';

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={setThemeByTime()} style={styles.background} />
      <ScrollView style={{ flex: 1, width: '100%', height: '100%' }}>
        <WeatherNow />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    },
    flexContainer1: {
      flex: 1,
      width: '100%',
    },
    flexContainer2: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
});