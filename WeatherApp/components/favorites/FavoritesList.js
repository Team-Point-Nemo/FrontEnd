import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Text, IconButton } from "react-native-paper";
import FavoriteIconButton from "./FavoriteIconButton";
import { useFavorites } from "./FavoritesContext";

export default function FavoritesList() {

  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="displayMedium" style={styles.header}>Favorites</Text>

        <FlatList
          data={favorites}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.cityName}>{item}</Text>
              <FavoriteIconButton iconColor="#932" city={item} />
            </View>
          )}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 50,
  },
  header: {
    color: '#333',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
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