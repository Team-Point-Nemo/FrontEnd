import * as React from "react";
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IndexScreen from "../screens/IndexScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();   // Returns React Native components, so preferably use capital letter on first one

export default function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,   // Screen headers hidden
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}   // Used to avoid Android nav bar
        onTabPress={({ route }) => {
           navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
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
          return options.tabBarLabel;
        }}
      />
    )}
  >
    <Tab.Screen
        name="Home"
        component={IndexScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, size }) => {
            return <Icon name={focused ? "sunny" : "sunny-outline"} size={size} color={focused ? theme.colors.primary : theme.colors.onSurfaceVariant} />
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ focused, size }) => {
            return <Icon name={focused ? "map" : "map-outline"} size={size} color={focused ? theme.colors.primary : theme.colors.onSurfaceVariant} />
          },
        }}
      />
    </Tab.Navigator>
  );
}