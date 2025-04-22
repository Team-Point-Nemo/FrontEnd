import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import FavoriteIconButton from "./FavoriteIconButton";
import { useFavorites } from "./FavoritesContext";

export default function FavoritesList(){
    const { favorites } = useFavorites();

    return (
        <FlatList
        data={favorites}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.cityName}>{item.name}</Text>
            <FavoriteIconButton city={item} />
          </View>
        )}
      />
    );
}

const styles = StyleSheet.create({
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: "#ccc",
    },
    cityName: {
      fontSize: 18,
      color: "#333",
    },
  });