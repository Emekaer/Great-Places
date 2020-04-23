import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/actions/places";

const PlaceListScreen = (props) => {
  const places = useSelector((state) => state.places.allPlaces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  if (places.length === 0) {
    return (
      <View style={styles.default}>
        <Text style={styles.text}>
          Please add Places by clicking the add Icon at the top right corner.
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={() => {
            props.navigation.navigate("PlaceDetailScreen", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          title={itemData.item.title}
          address={null}
          image={itemData.item.image}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default PlaceListScreen;
