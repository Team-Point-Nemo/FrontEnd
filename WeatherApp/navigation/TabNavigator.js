import * as React from "react";
import { View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from 'react-native-paper';
// import { Icon, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IndexScreen from "../screens/IndexScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator(); // Returns React Native components, so preferably use capital letter on first one

export default function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
           navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.title;

          return label;
        }}
      />
    )}
  >
    <Tab.Screen
        name="Home"
        component={IndexScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={focused ? "sunny" : "sunny-outline"} size={size} color={color}/>;
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={focused ? "map" : "map-outline"} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
    {/* <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Index header hidden from tab navigator
        tabBarLabelStyle: { color: "black" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Weather") {
            iconName = focused ? "sunny" : "sunny-outline";
            color = "black";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
            color = "black";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Weather" component={IndexScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator> 
  );
}*/}