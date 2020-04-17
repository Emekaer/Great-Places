import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/Colors";
import * as imagePicker from "expo-image-picker";

const ImagePicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const takePicHandler = async () => {
    const image = await imagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image Picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Picture"
        color={Colors.primary}
        onPress={takePicHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    margin: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {},
});

export default ImagePicker;
