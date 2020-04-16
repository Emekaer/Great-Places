import Places from "../../models/places";
import { ADD_PLACES } from "../actions/places";

const initialState = {
  allPlaces: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACES:
      const newPlace = new Places(
        new Date().toString(),
        action.placeData.title
      );
      return { ...state, allPlaces: state.allPlaces.concat(newPlace) };

    default:
      return state;
  }
};
