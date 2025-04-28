import React from "react";
import { View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import FavoriteIconButton from "./FavoriteIconButton";
import { useFavorites } from "./FavoritesContext";
import { useNavigation } from "@react-navigation/native";

export default function FavoritesList() {

  const { favorites } = useFavorites();

  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Home', { selectedFavorite: item })
  }

  return (
    <SafeAreaView>
      <Text variant="displayMedium" style={styles.headerWithShadow}>Favorite Places</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => item + index}
        scrollEnabled= {false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => handleItemPress(item)} style={{ width: '70%' }}>
              <Text variant="titleLarge" style={styles.textWithShadow}>{item}</Text>
            </TouchableOpacity>
            <FavoriteIconButton city={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: '90%',
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  textWithShadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 1
    },
    marginTop: 30,
    marginBottom: 30,
  },
  headerWithShadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 1
    },
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
});