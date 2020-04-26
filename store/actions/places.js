export const ADD_PLACES = "ADD_PLACES";
export const DELETE_PLACES = "DELETE_PLACES";
export const FETCH_PLACES = "FETCH_PLACES";
import { insertPlace, fetchPlaces } from "../../helpers/db";
import * as FileSystem from "expo-file-system";
import ENV from "../../env";

export const addPlaces = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData)

    if(!resData.results){
      throw new Error("Something went wrong!");
    }

    const address = resData.results[0].formatted_address;

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
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACES,
        placeData: {
          id: dbResult.insertId,
          title: title,
          imageUri: newPath,
          address = address,
         coords :{
           lat:location.lat,
           lng: location.lng,
         }
        },
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
