export const ADD_PLACES = "ADD_PLACES";
export const DELETE_PLACES = "DELETE_PLACES";
export const FETCH_PLACES = "FETCH_PLACES";
import { insertPlace, fetchPlaces } from "../../helpers/db";
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
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy Address",
        15.6,
        12.3
      );
      console.log(dbResult);
      console.log('Break');
      dispatch({
        type: ADD_PLACES,
        placeData: { id: dbResult.insertId, title: title, imageUri: newPath },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({
        type: FETCH_PLACES,
        places: dbResult.rows._array,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deletePlaces = (id) => {
  return { type: DELETE_PLACES, id: id };
};
