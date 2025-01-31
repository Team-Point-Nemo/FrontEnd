import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={({ navigation }) => ({
                    headerShown: true,
                    headerTitle: () => (
                        <MaterialCommunityIcons name="weather-sunny" size={30} color="black" />
                    ),
                    headerRight: () => (
                        <View style={styles.headerRightView}>
                            <Ionicons 
                                name="location-sharp" 
                                size={24} 
                                color="black" 
                                style={styles.iconsTopRight} />
                            <Ionicons 
                                name="search" 
                                size={24} 
                                color="black" 
                                style={styles.iconsTopRight} />
                            <Ionicons
                                name="settings"
                                size={24}
                                color="black"
                                style={styles.iconsTopRight}
                                onPress={() => navigation.navigate("Settings")}
                            />
                        </View>
                    ),
                })}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerRightView: {
        flexDirection: 'row',
    },
    iconsTopRight: {
        marginRight: 20,
    }
})