import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const [selectedCoordinate, setSelectedCoordinate] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.48,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  selectLocationHandler = (event) => {
    setSelectedCoordinate({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }

    props.navigation.navigate("NewPlaceScreen", {
      pickedLocation: selectedCoordinate,
    });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerLocation;

  if (selectedCoordinate) {
    markerLocation = {
      latitude: selectedCoordinate.lat,
      longitude: selectedCoordinate.lng,
    };
  }

  return (
    <MapView
      style={styles.screen}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerLocation && (
        <Marker title="Pick an Address" coordinate={markerLocation} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MapScreen;
