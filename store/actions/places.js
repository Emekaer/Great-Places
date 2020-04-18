export const ADD_PLACES = "ADD_PLACES";
export const DELETE_PLACES = "DELETE_PLACES";
import * as FileSystem from "expo-file-system";

export const addPlaces = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

    return { type: ADD_PLACES, placeData: { title: title, imageUri: newPath } };
  };
};

export const deletePlaces = (id) => {
  return { type: DELETE_PLACES, id: id };
};
