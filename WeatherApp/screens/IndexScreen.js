import { StyleSheet, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NewWeatherNow from "../components/weather/NewWeatherNow";
import { setThemeByTime } from "../components/date/DateService";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={setThemeByTime()} style={styles.background} />
      <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
        <NewWeatherNow />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 3,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  flexContainer1: {
    flex: 1,
    width: "100%",
  },
  flexContainer2: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
