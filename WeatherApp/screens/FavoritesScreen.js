import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoritesList from "../components/favorites/FavoritesList";

export default function FavoritesScreen() {

  return(
    <SafeAreaView>
      <FavoritesList />
    </SafeAreaView>
  )
}
