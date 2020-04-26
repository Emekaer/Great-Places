import Places from "../../models/places";
import { ADD_PLACES, DELETE_PLACES, FETCH_PLACES } from "../actions/places";

const initialState = {
  allPlaces: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      return {
        allPlaces: action.places.map(
          (pl) =>
            new Places(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    case ADD_PLACES:
      const newPlace = new Places(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.imageUri,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return { allPlaces: state.allPlaces.concat(newPlace) };

    case DELETE_PLACES:
      return {
        ...state,
        allPlaces: state.allPlaces.filter((place) => place.id !== action.id),
      };

    default:
      return state;
  }
};
