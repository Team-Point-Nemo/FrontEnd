// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import { StyleSheet, SafeAreaView, Image, ImageBackground, View } from 'react-native';
// import { Text } from 'react-native-paper';
// import { getCurrentWeatherInLocation } from '../../api';
// import { getCurrentDate, setImageByTime } from '../date/DateService';
// import UserLocation from '../Location/UserLocation';
// import CityFetch from '../Location/CityFetch';

// export default function WeatherNow() {
//   const [location, setLocation] = useState({});
//   const [weather, setWeather] = useState([]);

//   useEffect(() => {
//     if (location.coords) {  // Ensures, that location.coords has a value
//       getWeather(location)
//     }
//   }, [location]);

//   const handleLocationFetched = (location) => {   // 'location'-object is passed from UserLocation-component
//   setLocation(location);
//   };

//   const getWeather = async () => {
//     try {
//       const data = await getCurrentWeatherInLocation(location);
//       if (data) {
//         setWeather(data);
//       } else {
//         console.error("Weather data not found.");
//         setWeather(null);
//       }
//     } catch (err) {
//         console.error("Error in fetching location: ", err);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <UserLocation onLocationFetched={handleLocationFetched} />
//       <ImageBackground 
//       source={setImageByTime()}
//       style={styles.image} >
//         {location && <CityFetch location={location} />}
//         <Text variant="titleLarge">{getCurrentDate()}</Text>
//       </ImageBackground>
//       {weather?.main && (   // Checks, that weather (and main-array in it's data) has value, before rendering.
//         <View style={styles.weatherContainer}>
//           <View style={styles.columnLeft}>
//           <Text variant="displayMedium">{weather.main.temp.toFixed(0)}°</Text>
//           {weather?.weather && weather.weather[0] ? (
//               <Image 
//                 style={styles.weatherIcon}
//                 source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
//               />
//             ) : null}
//           </View>
//           <View style={styles.columnRight}>
//             <Text variant="titleMedium">Feels like: {weather.main.feels_like.toFixed(0)}°</Text>
//             <Text variant="titleMedium">Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
//           </View>
//         </View>
//       )}
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   width: '100%',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginBottom: 10,
// },
// image: {
//   flex: 1,
//   width: '100%',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   paddingBottom: 30,
// },
// weatherContainer: {
//   padding: 50,
//   width: '100%',
//   flexDirection: 'row',
//   alignItems: 'center',
// },
// columnLeft: {
//   flex: 1,
//   flexDirection: 'row',
//   alignItems: 'center',
// },
// columnRight: {
//   flex: 1,
// },
// weatherIcon: {
//   width: 70,
//   height: 70,
// },
// });

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getCurrentWeatherInLocation } from '../../api';
import { getCurrentDate, } from '../date/DateService';
import UserLocation from '../Location/UserLocation';
import CityFetch from '../Location/CityFetch';

export default function WeatherNow() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (location.coords) {  // Ensures, that location.coords has a value
      getWeather(location)
    }
  }, [location]);

  const handleLocationFetched = (location) => {   // 'location'-object is passed from UserLocation-component
  setLocation(location);
  };

  const getWeather = async () => {
    try {
      const data = await getCurrentWeatherInLocation(location);
      if (data) {
        setWeather(data);
      } else {
        console.error("Weather data not found.");
        setWeather(null);
      }
    } catch (err) {
        console.error("Error in fetching location: ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserLocation onLocationFetched={handleLocationFetched} />
      {location && <CityFetch location={location} />}
      <Text variant="titleLarge">{getCurrentDate()}</Text>
      {weather?.main && (   // Checks, that weather (and main-array in it's data) has value, before rendering.
        <View style={styles.weatherContainer}>
          <View style={styles.columnLeft}>
          <Text variant="displayMedium">{weather.main.temp.toFixed(0)}°</Text>
          {weather?.weather && weather.weather[0] ? (
              <Image 
                style={styles.weatherIcon}
                source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
              />
            ) : null}
          </View>
          <View style={styles.columnRight}>
            <Text variant="titleMedium">Feels like: {weather.main.feels_like.toFixed(0)}°</Text>
            <Text variant="titleMedium">Wind speed: {weather.wind.speed.toFixed(0)} m/s</Text>
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},
weatherContainer: {
  padding: 50,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
},
columnLeft: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
},
columnRight: {
  flex: 1,
},
weatherIcon: {
  width: 70,
  height: 70,
},
});