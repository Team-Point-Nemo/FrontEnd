import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Text , useTheme} from "react-native-paper";
import FavoriteIconButton from "./FavoriteIconButton";
import { useFavorites } from "./FavoritesContext";
import { useNavigation } from "@react-navigation/native";

export default function FavoritesList() {

  const { favorites } = useFavorites();

  const theme = useTheme();

  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Home', { selectedFavorite: item })
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text variant="displayMedium" style={styles.header}>Favorites</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => item + index}
          scrollEnabled= {false}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <Text style={styles.cityName}>{item}</Text>
              </TouchableOpacity>
              <FavoriteIconButton iconColor="#932" city={item} />
            </View>
          )}
        />
      </SafeAreaView>
    </ScrollView>
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