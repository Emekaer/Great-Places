import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [isLoading, setIsoading] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapLocation = props.route.params.pickedLocation;

  const {onLocationPicked} = props;

  useEffect(() => {
    if (mapLocation) {
      setPickedLocation(mapLocation);
      onLocationPicked(mapLocation);
    }
  }, [mapLocation, onLocationPicked]);

  const getLocationHandler = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permission to use this app.",
        [{ text: "Okay" }]
      );
      return;
    }

    try {
      setIsoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsoading(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("MapScreen");
  };

  return (
    <View style={styles.picker}>
      <MapPreview
        style={styles.mapPreview}
        onPress={pickOnMapHandler}
        location={pickedLocation}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.primary} size="large" />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default LocationPicker;
