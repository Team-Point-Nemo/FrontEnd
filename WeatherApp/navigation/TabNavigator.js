import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import IndexScreen from "../screens/IndexScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator(); // Returns React Native components, so preferably use capital letter on first one

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, //index header hidden from tab navigator
                tabBarLabelStyle: { color: 'black' },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Index") {
                        iconName = focused ? "sunny" : "sunny-outline";
                        color = 'black';
                    } else if (route.name === "Map") {
                        iconName = focused ? "map" : "map-outline";
                        color = 'black';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Index" component={IndexScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
    )
}