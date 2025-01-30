import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import IndexScreen from "./screens/IndexScreen";
import MapScreen from "./screens/MapScreen";

const Tab = createBottomTabNavigator(); // Returns React Native components, so preferably use capital letter on first one

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
          headerShown: false, // Hides header of the page
          tabBarLabelStyle: { color: 'black' },
          tabBarIcon: ({ focused, color, size }) => { 

            let iconName;

            if (route.name === 'Index') {
              iconName = focused ? 'sunny' : 'sunny-outline'; // Icon changes when clicked (focused = true)
              color= 'black';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline'; // Icon changes when clicked (focused = true)
              color= 'black';
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