// import { StyleSheet, SafeAreaView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import WeatherNow from '../components/weather/WeatherNow';
// import Forecast from '../components/weather/forecast/Forecast';
// import { setThemeByTime } from '../components/date/DateService';

// export default function IndexScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient colors={setThemeByTime()} style={styles.background} />
//         <WeatherNow />
//         <Forecast />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   background: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     height: '100%',
//     },
// });

import { StyleSheet, SafeAreaView, ImageBackground, View } from 'react-native';
import WeatherNow from '../components/weather/WeatherNow';
import Forecast from '../components/weather/forecast/Forecast';
import { setImageByTime } from '../components/date/DateService';

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
      source={setImageByTime()}
      style={styles.image}>
      <View style={styles.overlay}>
        <WeatherNow />
        <Forecast />
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers all of background
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});