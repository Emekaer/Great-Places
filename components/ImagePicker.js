import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/Colors";
import * as imagePicker from "expo-image-picker";

const ImagePicker = (props) => {
  const takePicHandler = () => {
    imagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image Picked yet.</Text>
        <Image style={styles.image} />
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
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {},
});

export default ImagePicker;
