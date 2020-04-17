import Places from "../../models/places";
import { ADD_PLACES, DELETE_PLACES } from "../actions/places";

const initialState = {
  allPlaces: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACES:
      const newPlace = new Places(
        new Date().toString(),
        action.placeData.title,
        action.placeData.imageUri,
      );
      return { ...state, allPlaces: state.allPlaces.concat(newPlace) };

    case DELETE_PLACES:
      return {
        ...state,
        allPlaces: state.allPlaces.filter((place) => place.id !== action.id),
      };

    default:
      return state;
  }
};
