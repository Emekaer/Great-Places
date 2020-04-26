import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import * as placesAction from "../store/actions/places";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker.js";

const NewPlaceScreen = (props) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState("");
  const [image, setImage] = useState();
  const [mapLocation, setMapLocation] = useState();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const locationPickedHandler = useCallback((location) => {
    setMapLocation(location)
  },[]);

  const savePlaceHandler = () => {
    dispatch(placesAction.addPlaces(titleValue, image, mapLocation));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          color={Colors.primary}
          title="Save Place"
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    /* flex: 1,
    justifyContent: "center",
    alignItems: "center", */
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
