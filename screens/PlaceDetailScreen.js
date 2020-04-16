import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as placesAction from "../store/actions/places";

const PlaceDetailScreen = (props) => {
  const placeId = props.route.params.placeId;
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(placesAction.deletePlaces(placeId));
    props.navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <Text>This is the PlaceDetailScreen</Text>
      <Button title="Delete" color={Colors.primary} onPress={deleteHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlaceDetailScreen;
