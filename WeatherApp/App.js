import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import IndexScreen from "./screens/IndexScreen";
import MapScreen from "./screens/MapScreen";

const Tab = createBottomTabNavigator(); // Palauttaa React Native -komponentteja, joten iso alkukirjain selkeyttää

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
          headerShown: false, // Piilottaa sivun otsikon
          tabBarLabelStyle: { color: 'black' },
          tabBarIcon: ({ focused, color, size }) => { 

            let iconName;

            if (route.name === 'Index') {
              // iconName = 'sunny';
              iconName = focused ? 'sunny' : 'sunny-outline'; // Ikoni vaihtuu klikatessa (focused = true)
              color= 'black';
            } else if (route.name === 'Map') {
              iconName = 'settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Index" component={IndexScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}