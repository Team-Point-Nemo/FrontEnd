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
        <View style={styles.flexContainer1}>
        <WeatherNow />
        </View>
        <View style={styles.flexContainer2}>
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
  },
  flexContainer1: {
    flex: 1,
    marginTop: 90,
  },
  flexContainer2: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
});