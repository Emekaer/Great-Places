import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";

const PlaceListScreen = (props) => {
  const places = useSelector((state) => state.places.allPlaces);
  return (
   
    <FlatList 
    data={places}
      keyExtractor={item =>  item.id }
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={() => {props.navigation.navigate("PlaceDetailScreen", {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id,
          })}}
          title={itemData.item.title}
          address={null}
          image={null}
        />
      )}
    />
  );
};

export default PlaceListScreen;
