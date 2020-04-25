import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const MapScreen = (props) => {
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.48,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView style={styles.screen} region={mapRegion} />;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
 
  },
});

export default MapScreen;
